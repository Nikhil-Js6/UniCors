import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { UserContext } from '../../../context';
import { Alert } from '../../../utils/Alerts';
import { ArrowLeftOutlined } from '@ant-design/icons';
import FollowCard from '../../../components/cards/FollowCard';
import styles from '../../../styles/Profile.module.css'
import axios from 'axios';


const Followers = () => {

    const userId = useRouter().query.id;
    const [state] = useContext(UserContext);

    const [user, setUser] = useState('');
    const [followers, setFollowers] = useState([]);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        if (state && state.token && userId) {
            fetchFollowers();
        }
    }, [state && state.token && userId]);

    const alertMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type || 3);
        setTimeout(() => {
            setMessage('');
        }, 3600);
    }

    const fetchFollowers = async () => {
        try {
            const res = await axios.post('/get-followers', { _id: userId });
            setUser(res.data.user);
            setFollowers(res.data.followers);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t get followers!', 0);
        }
    }

    return (
        <div className={styles.followingsWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>
                    { userId === state?.userInfo._id ? 'Followers' : `${user}'s Followers` }
                </span>
            </span>
            <div className={styles.alertsWrapper}>
                { message && Alert(message, messageType) }
            </div>
            <span className={styles.backArrow}>
                <Link href={'/user/profile'}>
                    <ArrowLeftOutlined />
                </Link>
            </span>

            <FollowCard access={false} userArray={followers} />
        </div>
    )
}

export default Followers
