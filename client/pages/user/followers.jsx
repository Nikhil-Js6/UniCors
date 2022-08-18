import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../../context'
import UserRoute from '../../routes/UserRoute'
import styles from '../../styles/Profile.module.css'
import { Alert } from '../../utils/Alerts'
import FollowCard from '../../components/cards/FollowCard'
import { ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios'


const Followers = () => {

    const [state, setState] = useContext(UserContext);

    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        if (state && state.token) {
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

    const handleRemove = async (user) => {
        setLoading(true);
        try {
            const res = await axios.put('/remove-follower', { _id: user._id });
            if (res.data) {
                
                let auth = JSON.parse(localStorage.getItem('Unicors_User'));
                auth.userInfo = res.data;
                localStorage.setItem('Unicors_User', JSON.stringify(auth));

                setState({ ...state, user: res.data });
                
                let filtered = followers.filter((f) => f._id !== user._id);
                setFollowers(filtered);
                alertMessage(`Removed ${user.name}!`, 1);
                fetchFollowers();
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
                    <span className={styles.title}>Followers</span>
                </span>
                <div className={styles.alertsWrapper}>
                    { message && Alert(message, messageType) }
                </div>
                <span className={styles.backArrow}>
                    <Link href={'/user/profile'}>
                        <ArrowLeftOutlined />
                    </Link>
                </span>

                <FollowCard page='followers' userArray={followers} handleRemove={handleRemove} loading={loading} />
            </div>
        </UserRoute>
    )
}

export default Followers