import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import UserRoute from '../../routes/UserRoute'
import { UserContext } from '../../context'
import { Alert } from '../../utils/Alerts'
import { ReloadOutlined } from '@ant-design/icons'
import CreatePost from '../../components/forms/CreatePost'
import PostCard from '../../components/cards/PostCard'
import Search from '../../components/Search'
import People from '../../components/cards/People'
import styles from '../../styles/Profile.module.css'
import axios from 'axios'
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection: true,
});


const profile = () => {

    const [state, setState] = useContext(UserContext);

    const [searchUsers, setSearchUsers] = useState([]);

    const [userPosts, setUserPosts] = useState([]);
    const [people, setPeople] = useState([]);

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [followLoading, setFollowLoading] = useState(false);

    const [content, setContent] = useState('');
    const [image, setImage] = useState({});

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        if (state && state.token) {
            fetchUserPosts();
            fetchPeople();
            fetchFollowings();
            fetchFollowers();
        }
    }, [state && state.token]);

    const alertMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type || 3);
        setTimeout(() => {
            setMessage('');
        }, 3600);
    }

    const fetchUserPosts = async () => {
        try {
            const userPosts = await axios.get('/user-feed');
            setUserPosts(userPosts.data);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t load posts!', 2);
        }
    }

    const fetchPeople = async () => {
        try {
            const findPeople = await axios.get('/find-people');
            setPeople(findPeople.data);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t find people!', 2);
        }
    }

    const fetchFollowings = async () => {
        try {
            const res = await axios.get('/user-followings');
            setFollowings(res.data);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t get followings!', 0);
        }
    }

    const fetchFollowers = async () => {
        try {
            const res = await axios.get('/user-followers');
            setFollowers(res.data);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t get followings!', 0);
        }
    }

    const handleFollow = async (user) => {
        setFollowLoading(true);
        try {
            const res = await axios.put('/follow-user', { _id: user._id });
            if (res.data) {
             // Update user in localstorage:
                let auth = JSON.parse(localStorage.getItem('Unicors_User'));
                auth.userInfo = res.data;
                localStorage.setItem('Unicors_User', JSON.stringify(auth));
             // Update context:
                setState({ ...state, user: res.data });
             // Update people:
                let filtered = people.filter((p) => p._id !== user._id);
                setPeople(filtered);
                setSearchUsers(filtered);
                alertMessage(`Following ${user.name}!`, 1);
                fetchUserPosts();
                fetchFollowings();
                setFollowLoading(false);
            }
        } 
        catch (err) {
            console.log(err);
            alertMessage('Unable to follow!', 2);
        }
    }

    const handleUnfollow = async (user) => {
        setLoading(true);
        try {
            const res = await axios.put('/unfollow-user', { _id: user._id });
            if (res.data) {
                // Update user in localstorage:
                   let auth = JSON.parse(localStorage.getItem('Unicors_User'));
                   auth.userInfo = res.data;
                   localStorage.setItem('Unicors_User', JSON.stringify(auth));
                // Update context:
                   setState({ ...state, user: res.data });
                // Update people:
                   let filtered = followings.filter((f) => f._id !== user._id);
                   setSearchUsers(filtered);
                   alertMessage(`Unfollowed ${user.name}!`, 1);
                   fetchFollowings();
                   setLoading(false);
            }
        } 
        catch (err) {
            console.log(err);
            alertMessage('Unable to process!', 2);
            setLoading(false);
        }
    }

    const handleCreate = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/create-post', { content, image });
            setContent('');
            setImage({});
            setLoading(false);
            fetchUserPosts();
            if (res.data) {
                alertMessage('Post Created!', 3);
                socket?.emit('new-post', res.data.newPost);
            }
        }
        catch (err) {
            console.log(err);
            alertMessage('Can\'t create post!', 2);
            setLoading(false);
        }
    }

    const handleImage = async e => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const { data } = await axios.post('/upload-image', formData);
            setImage({
                url: data.url,
                public_id: data.public_id
            });
            setUploading(false);
        } 
        catch (err) {
            console.log(err);
            setUploading(false);
        }
    }

    return (
        <UserRoute>
            <div className={styles.profileWrapper}>
                <span className={styles.bg}>
                    <span className={styles.title}>Profile</span>
                </span>
                <div className={styles.alertsWrapper}>
                    { message && Alert(message, messageType) }
                </div>
                <div className={styles.profile}>
                    <div className={styles.post}>
                        <CreatePost 
                            content={content}
                            image={image}
                            loading={loading}
                            uploading={uploading}
                            setContent={setContent}
                            setMessage={setMessage}
                            handleCreate={handleCreate}
                            handleImage={handleImage}
                        />
                    {
                        userPosts.length 
                            ? <PostCard 
                                userPosts={userPosts} 
                                fetchUserPosts={fetchUserPosts} 
                                Message={alertMessage}
                              /> 
                            : <div className={styles.noPosts}>No Posts!</div>
                    }
                        <div className={styles.reloadWrapper}>
                            <ReloadOutlined 
                                className={styles.reloadIcon}
                                onClick={() => window.location.reload()}
                            />
                        </div>
                    </div>
                    
                    <div className={styles.sidebar}>
                        
                        <div>
                            <Search 
                                searchUsers={searchUsers}
                                setSearchUsers={setSearchUsers}
                                handleFollow={handleFollow}
                                handleUnfollow={handleUnfollow}
                                fetchUserPosts={fetchUserPosts}
                                fetchFollowings={fetchFollowings}
                            />
                        </div>

                        <div className={styles.userFollow}>
                            <span className={styles.linkSpan}>
                                <Link href={'/user/followers'}>
                                    <a>{followers?.length} Followers</a>
                                </Link>
                            </span>
                            <span className={styles.linkSpan}>
                                <Link href={'/user/followings'}>
                                    <a>{followings?.length} Following</a>
                                </Link>
                            </span>
                        </div>

                        { 
                          people.length > 0 && (
                            <div className={styles.list}>
                                <span style={{ color: 'grey' }}>Users to follow:</span>
                            {
                                people.map((user) => (
                                    <People key={user._id} user={user} handleFollow={handleFollow} loading={followLoading} />
                                ))
                            }
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </UserRoute>
    )
}

export default profile
