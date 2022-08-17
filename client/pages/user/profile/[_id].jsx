import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../../context';
import { Alert } from '../../../utils/Alerts';
import ProfileCard from '../../../components/cards/ProfileCard';
import ProfilePostCard from '../../../components/cards/ProfilePostCard';
import styles from '../../../styles/PublicProfile.module.css'
import axios from 'axios';


const PublicProfile = () => {
    
    const userId = useRouter().query._id;
    const [state, setState] = useContext(UserContext);

    const [currentUser, setCurrentUser] = useState({});
    
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        fetchUser();
        setCurrentUser(state.userInfo);
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
            console.log(user);
            setFollowers(res.data?.followers);
            setFollowings(res.data?.followings);
        } 
        catch (err) {
            console.log(err);
        }
    }

    const fetchUserPosts = async () => {
        if (user?.status !== 'private') {
            try {
                const userPosts = await axios.post('/user-posts', { _id: userId });
                setUserPosts(userPosts.data);
            } 
            catch (err) {
                console.log(err);
                alertMessage('Can\'t load posts!', 2);
            }
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
            
            <ProfileCard 
                user={user}
                currentUser={currentUser}
                userPosts={userPosts}
                followers={followers}
                followings={followings}
                loading={loading}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
            />

            <ProfilePostCard 
                user={user}
                currentUser={currentUser}
                userPosts={userPosts}
                fetchUserPosts={fetchUserPosts}
            />

        </div>
    )
}

export default PublicProfile
