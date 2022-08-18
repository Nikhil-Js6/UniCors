import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../../context'
import UserRoute from '../../routes/UserRoute'
import styles from '../../styles/Profile.module.css'
import { ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Alert } from '../../utils/Alerts'
import FollowCard from '../../components/cards/FollowCard'

const Followings = () => {

    const [state, setState] = useContext(UserContext);

    const [followings, setFollowings] = useState([]);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        if (state && state.token) {
            fetchFollowings();
        }
    }, [state && state.token]);

    const alertMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type || 3);
        setTimeout(() => {
            setMessage('');
        }, 3600);
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
                   setFollowings(filtered);
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

    return (
        <UserRoute>
            <div className={styles.followingsWrapper}>
                <span className={styles.bg}>
                    <span className={styles.title}>Followings</span>
                </span>
                <div className={styles.alertsWrapper}>
                    { message && Alert(message, messageType) }
                </div>
                <span className={styles.backArrow}>
                    <Link href={'/user/profile'}>
                        <ArrowLeftOutlined />
                    </Link>
                </span>
                
                <FollowCard page='followings' userArray={followings} handleUnfollow={handleUnfollow} loading={loading} />
            </div>
        </UserRoute>
    )
}

export default Followings