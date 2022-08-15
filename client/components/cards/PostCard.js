import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context'
import moment from 'moment'
import { CaretUpOutlined, CommentOutlined, DeleteOutlined, EllipsisOutlined, HeartFilled, HeartOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined, MoreOutlined, SendOutlined, UpCircleOutlined } from '@ant-design/icons'
import styles from '../../styles/PostCard.module.css'
import { Alert } from '../../utils/Alerts'
import axios from 'axios'
import Link from 'next/link'

const PostCard = ({ page, userPosts, fetchUserPosts, Message }) => {

    const [state] = useContext(UserContext);

    const [more, setMore] = useState(false);
    const [visible, setVisible] = useState(false);
    const [render, setRender] = useState(false);

    const [comment, setComment] = useState('');
    
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        if (state && state.token && page !== 'home') {
            fetchUserPosts();
        }
    }, [state && state.token]);
    
    const alertMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type || 3);
        setTimeout(() => {
            setMessage('');
        }, 3600);
    }

    const handleLike = async (post) => {
        if (post.postedBy._id !== state?.userInfo?._id) {
            try {
                const res = await axios.put('/like-post', { _id: post._id });
                if (res.data) {
                    fetchUserPosts();
                }
            }
            catch (err) {
                console.log(err);
                alertMessage('Unable to process!', 2);
            }
        } 
    }
    
    const handleUnlike = async (post) => {
        try {
            const res = await axios.put('/unlike-post', { _id: post._id });
            if (res.data) {
                fetchUserPosts();
            }
        }
        catch (err) {
            console.log(err);
            alertMessage('Unable to process!', 2);
        }
    }

    const userImage = user => {
        if (user.image) {
            return user.image.url;
        }
        else {
            return '/noImage.jpg';
        }
    }

    function onlySpaces(str) {
        return str.trim().length === 0;
    }

    const addComment = async (e, post) => {
        e.preventDefault();
        if(!onlySpaces(comment)) {
            try {
                const res = await axios.put('/add-comment', { _id: post._id, comment });
                if (res.data) {
                    fetchUserPosts();
                    setComment('');
                }
            } 
            catch (err) {
                console.log(err);
            }
        }
    }

    const removeComment = async (post, comment) => {
        try {
            const res = await axios.put('/remove-comment', { _id: post._id, comment });
            if (res.data) {
                fetchUserPosts();
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`/post/${id}`);
            if (res.data) {
                fetchUserPosts();
            }
            Message(res.data.message, 3);
        } 
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.alertsWrapper}>
                { message && Alert(message, messageType) }
            </div>
        {
            userPosts.map((post) => (
                <div className={styles.card} key={post._id}>
                    <div className={styles.cardTop}>
                        <Link href={`/user/profile/${post.postedBy?._id}`}>
                            <div className={styles.cartTopLeft}>
                                <span className={styles.cardTopSpan}>
                                    <img className={styles.postUserImg} src={userImage(post.postedBy)} />
                                </span>
                                <span className={styles.postUser}>
                                {
                                    post.postedBy._id === state?.userInfo?._id
                                    ? 'You'
                                    : post.postedBy.name.substring(0, 1).toLocaleUpperCase() + post.postedBy.name.substring(1)
                                }
                                </span>
                                <span className={styles.postDate}>{moment(post.createdAt).fromNow()}.</span>
                            </div>
                        </Link>
                        <div className={styles.cartTopRight}>
                        { 
                        more 
                            ? <EllipsisOutlined
                                className={styles.moreIcon} 
                                onClick={() => setMore(!more)}
                            />
                            : <MoreOutlined 
                                className={styles.moreIcon}
                                onClick={() => setMore(!more)}
                            />
                        }
                        {
                        more && 
                            <div className={styles.postOptions}>
                                <span className={styles.postOption} onClick={() => setMore(!more)}>
                                    Like
                                </span>
                                <span className={styles.postOption} onClick={() => setMore(!more)}>
                                    <Link href={`/user/profile/${post.postedBy?._id}`}>
                                        Profile
                                    </Link>
                                </span>
                            { state?.userInfo?._id === post.postedBy._id && 
                                <div className={styles.postedBy}>
                                    <span className={styles.postOption}>
                                        Edit
                                    </span>
                                    <span className={styles.postOptionRed} onClick={() => deletePost(post._id)}>
                                        Delete
                                    </span>
                                </div>
                            }
                            </div>
                        }
                        </div>
                    </div>
                    <div className={styles.cardBody} onClick={() => setMore(false)}>
                        <img 
                            className={post.image?.url ? `${styles.postImg}` : `${styles.noImg}`} 
                            src={post.image?.url} 
                            alt='No Preview Available!'
                        />
                        <span className={styles.postContent}>{post.content}</span>
                    </div>
                    <div className={styles.cardBottom} onClick={() => setMore(false)}>
                        <div className={styles.iconDiv}>
                        {
                            post.likes.includes(state?.userInfo?._id)
                                ? <span onClick={() => handleUnlike(post)} className={`${styles.iconWrapper} ${styles.likedIconSpan}`}>
                                    <LikeFilled className={styles.likedIcon} />
                                </span>
                                : <span onClick={() => handleLike(post)} className={`${styles.iconWrapper} ${styles.likeIconSpan}`}>
                                    <LikeOutlined className={styles.likeIcon} />
                                </span>
                        }
                        { 
                            !post.likes.length
                                ? 'No Likes' 
                                : post.likes.length === 1 
                                    ?  '1 Like'
                                    :  `${ post.likes.length } Likes`
                        }
                        </div>
                        <div className={styles.iconDiv}>
                            <span className={`${styles.iconWrapper} ${styles.commentIconSpan}`}>
                                <CommentOutlined className={styles.commentIcon} onClick={() => setRender(!render)}/>
                            </span>
                            <span className={styles.commentSpan} onClick={() => setVisible(!visible)}>
                            {
                                !post.comments.length
                                    ? 'No Comments' 
                                    : post.comments.length === 1 
                                        ?  '1 Comment'
                                        :  `${ post.comments.length } Comments`
                            }
                            </span>
                            { visible && <span className={styles.commmentUp}><CaretUpOutlined /></span>}
                        </div>
                    </div>
                {
                  render &&
                   <form className={styles.commentForm} onSubmit={(e) => addComment(e, post)}>
                        <span className={styles.inputWrapper}>
                            <input 
                                className={styles.commentInput} 
                                placeholder='Write a comment...' 
                                type={'text'} value={comment} 
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className={styles.commentButton} type='submit'><SendOutlined /></button>
                        </span>
                    </form>
                }
                { 
                  visible &&
                    <div className={styles.comments}>
                    {  !post.comments.length && 
                            <span className={styles.noComments} onClick={() => setRender(true)}>
                                No comments! <br /> 
                                Start a conversation
                            </span>
                    }
                    {
                        post.comments?.map(c => (
                            <div className={styles.comment}>
                            <span className={styles.commentHead}>
                                <span className={styles.commentUser}>
                                    <img className={styles.commentImage} src={c.postedBy?.image || '/noImage.jpg'} />
                                {
                                    c.postedBy._id === state?.userInfo?._id
                                        ? 'You'
                                        : c.postedBy.name.substring(0, 1).toLocaleUpperCase() + c.postedBy.name.substring(1)
                                }
                                </span>
                                <span className={styles.commentDate}>
                                    {moment(c.created).fromNow()}
                                </span>
                            </span>
                            <span className={styles.commentBody}>
                                {c.text}
                            {
                                c.postedBy._id === state?.userInfo._id &&
                                <span className={styles.deleteComment} onClick={() => removeComment(post, c)}>
                                    <DeleteOutlined />
                                </span>
                            }
                            </span>
                        </div>
                        ))
                    }
                    { visible && 
                        <span className={styles.close} onClick={() => setVisible(false)}>
                            ...close
                            <CaretUpOutlined />
                        </span>
                    }
                    </div>
                }
                </div>
            ))
        }
        </div>
    )
}

export default PostCard