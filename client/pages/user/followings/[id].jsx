import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { UserContext } from '../../../context';
import FollowCard from '../../../components/cards/FollowCard';
import { Alert } from '../../../utils/Alerts';
import styles from '../../../styles/Profile.module.css'
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';


const Followings = () => {

    const userId = useRouter().query.id;
    const [state] = useContext(UserContext);

    const [user, setUser] = useState('');
    const [followings, setFollowings] = useState([]);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(0);

    useEffect(() => {
        if (state && state.token && userId) {
            fetchFollowings();
        }
    }, [state && state.token && userId]);

    const alertMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type || 3);
        setTimeout(() => {
            setMessage('');
        }, 3600);
    }

    const fetchFollowings = async () => {
        try {
            const res = await axios.post('/get-followings', { _id: userId });
            setUser(res.data.user);
            setFollowings(res.data.followings);
        } 
        catch (err) {
            console.log(err);
            alertMessage('Can\'t get followings!', 0);
        }
    }

    return (
        <div className={styles.followingsWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>
                    { userId === state?.userInfo?._id ? 'Followings' : `${user}'s Followings` }
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

            <FollowCard access={false} userArray={followings} />
        </div>
    )
}

export default Followings
