import { CheckOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context'
import styles from '../../styles/Messenger.module.css'
import axios from 'axios'

const conversation = ({ conversation, setConversationId }) => {

    const [state] = useContext(UserContext);

    const userId = conversation.members.filter(id => id !== state?.userInfo?._id);

    const [user, setUser] = useState([]);

    useEffect(() => {
        if (state && state.token) {
            getUsers();
        }
    }, [conversation.members]);

    const getUsers = async () => {
        try {
            const user = await axios.post('/get-user', { _id: [userId] });
            setUser(user.data);
        } 
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div 
            className={styles.conversation} 
            onClick={() => {
                setConversationId(conversation._id)
            }}
        >
            <div className={styles.imageWrapper}>
                <img className={styles.chatUserImg} src={user.image?.url || '/noImage.jpg'}/>
                <span className={styles.online}></span>
            </div>
            <div className={styles.user}>
                <div className={styles.username}>{user.name}</div>
                <div className={styles.msg}>{'About User'}</div>
            </div>
            <div className={styles.msgIcons}>
                <CheckOutlined style={{ color: '#1775e5' }}/>
            </div>
        </div>
    )
}

export default conversation
