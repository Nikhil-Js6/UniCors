import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { UserContext } from '../../../context';
import PostCard from '../../../components/cards/PostCard';
import { Alert } from '../../../utils/Alerts';
import styles from '../../../styles/PublicProfile.module.css'
import { SyncOutlined } from '@ant-design/icons';
import axios from 'axios';


const PublicProfile = () => {
    
    const userId = useRouter().query._id;
    const [state, setState] = useContext(UserContext);
    
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        fetchUser();
        fetchUserPosts();
    }, [state && state.token && userId]);

    const alertMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type || 3);
        setTimeout(() => {
            setMessage('');
        }, 3600);
    }

    const fetchUser = async () => {
        try {
            const res = await axios.post('/get-user', { _id: userId });
            setUser(res.data);
            setFollowers(res.data?.followers);
            setFollowings(res.data?.followings);
        } 
        catch (err) {
            console.log(err);
        }
    }

    const fetchUserPosts = async () => {
        try {
            const userPosts = await axios.post('/user-posts', { _id: userId });
            setUserPosts(userPosts.data);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t load posts!', 2);
        }
    }
    
    const handleFollow = async (user) => {
        setLoading(true);
        try {
            const res = await axios.put('/follow-user', { _id: user._id });
            if (res.data.error) {
                alertMessage(res.data.error, 2);
                setLoading(false);
                return;
            }
            if (res.data) {
             // Update user in localstorage:
                let auth = JSON.parse(localStorage.getItem('Unicors_User'));
                auth.userInfo = res.data;
                localStorage.setItem('Unicors_User', JSON.stringify(auth));
             // Update context:
                setState({ ...state, user: res.data });
                alertMessage(`Following ${user.name}!`, 1);
                fetchUser();
                setLoading(false);
            }
        } 
        catch (err) {
            console.log(err);
            alertMessage('Unable to follow!', 2);
            setLoading(false);
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
                alertMessage(`Unfollowed ${user.name}!`, 1);
                fetchUser();
                setLoading(false);
            }
        } 
        catch (err) {
            console.log(err);
            alertMessage('Unable to process!', 2);
            setLoading(false);
        }
    }

    return (
        <div className={styles.profileWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>
                    { user?.name?.substring(0, 1).toLocaleUpperCase() + user?.name?.substring(1) || 'Profile' }
                </span>
            </span>
            <div className={styles.alertsWrapper}>
                { message && Alert(message, messageType) }
            </div>
            <div className={styles.profileCard}>
                <div className={styles.cardHead}>
                    <img className={styles.userImg} src={user?.image || '/noImage.jpg'}/>
                    <div className={styles.userInfo}>
                        <div className={styles.followInfo}>
                            <span className={styles.followers}>
                                <Link href={`/user/followers/${user?._id}`}>
                                    <a>{followers?.length} Followers</a>
                                </Link>
                            </span>
                            <span className={styles.followings}>
                                <Link href={`/user/followings/${user?._id}`}>
                                    <a>{followings?.length} Followings</a>
                                </Link>
                            </span>
                        </div>
                        
                        <div className={styles.buttons}>
                        {
                            state?.userInfo?._id !== user?._id && 

                            user?.followers?.includes(state?.userInfo?._id)
                                ? <span 
                                    className={`${styles.button} ${styles.unfollow}`} 
                                    onClick={() => handleUnfollow(user)}
                                >
                                    { loading ?  <SyncOutlined /> : 'Unfollow'}
                                </span>
                                : <span 
                                    className={`${styles.button} ${styles.follow}`}
                                    onClick={() => handleFollow(user)}
                                >
                                    { loading ? <SyncOutlined /> :'Follow'}
                                </span>
                        }
                        </div>
                    </div>
                </div>
                <div className={styles.cardBody}>
                    <span className={styles.username}><h2>Anonymous</h2></span>
                    <span className={styles.about}>Hello, I am Anonymous, You don't know me.Create any YouTube 
                    intro in minutes. A strong intro increases view time! 
                    Use a template or choose from over 110M+ <br /> intro footage options. Brand and share.</span>
                </div>
            </div>
            <div className={styles.post}>
            {
                userPosts.length 
                    ? <PostCard userPosts={userPosts} fetchUserPosts={fetchUserPosts}/> 
                    : <div className={styles.noPosts}>No Posts!</div>
            }
            </div>
        </div>
    )
}

export default PublicProfile
