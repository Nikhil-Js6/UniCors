import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context'
import AdminRoute from '../../routes/AdminRoute'
import { Alert } from '../../utils/Alerts'
import { DeleteOutlined } from '@ant-design/icons'
import styles from '../../styles/Admin.module.css'
import axios from 'axios'
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection: true,
});

const Admin = () => {

    const [state] = useContext(UserContext);

    const [userPosts, setUserPosts] = useState([]);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        if (state && state.token) {
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
        
    const userImage = user => {
        if (user.image) {
            return user.image?.url;
        }
        else {
            return '/noImage.jpg';
        }
    }

    const fetchUserPosts = async () => {
        try {
            const res = await axios.get('/all-posts');
            setUserPosts(res.data);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t load posts!', 2);
        }
    }

    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`/admin/delete-post/${id}`);
            fetchUserPosts();
            if (res.data) {
                alertMessage(res.data.message, 3);
                socket.emit('post-deleted', res.data.deletedPost);
            } 
        } 
        catch (err) {
            console.log(err);
        }
    }

    return (
        <AdminRoute>
            <div className={styles.adminWrapper}>
                <span className={styles.bg}>
                    <span className={styles.title}>Admin</span>
                </span>
                <div className={styles.alertsWrapper}>
                    { message && Alert(message, messageType) }
                </div>
                <div className={styles.postWrapper}>
                {
                    userPosts.map(post => (
                        <div className={styles.post} key={post._id}>
                            <div className={styles.UserWrapper}>
                                <div className={styles.postUser}>
                                    <span>
                                        <img className={styles.postUserImg} src={userImage(post.postedBy)} />
                                    </span>
                                    <span className={styles.postUsername}>
                                    {
                                        post.postedBy._id === state?.userInfo?._id
                                        ? 'You'
                                        : post.postedBy.name.substring(0, 1).toLocaleUpperCase() + post.postedBy.name.substring(1)
                                    }
                                    </span>
                                </div>
                                <div className={styles.postContent}>
                                    {post?.content.substring(0, 100)}...
                                </div>
                            </div>
                            <div className={styles.remove} onClick={() => deletePost(post._id)}>Delete <DeleteOutlined /></div>
                        </div>
                    ))
                }   
                </div>
            </div>
        </AdminRoute>
    )
}

export default Admin
