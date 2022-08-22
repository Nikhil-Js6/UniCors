import { CheckOutlined } from '@ant-design/icons';
import { useState, useContext } from 'react'
import { UserContext } from '../../context'
import styles from '../../styles/Messenger.module.css'

const conversation = ({ conversation, setConversationId, conversation: { users } }) => {

    return (
        <div 
            className={styles.conversation} 
            onClick={() => {
                setConversationId(conversation._id)
            }}
        >
            <div className={styles.imageWrapper}>
                <img className={styles.chatUserImg} src={users?.reciever?.image || '/noImage.jpg'}/>
                <span className={styles.online}></span>
            </div>
            <div className={styles.user}>
                <div className={styles.username}>{users?.reciever?.name}</div>
                <div className={styles.msg}>Hii...</div>
            </div>
            <div className={styles.msgIcons}>
                <CheckOutlined style={{ color: '#1775e5' }}/>
            </div>
        </div>
    )
}

export default conversation

{/* <div className={styles.conversation}>
    <div className={styles.imageWrapper}>
        <img className={styles.chatUserImg} src={'/noImage.jpg'} />
        <span className={styles.online}></span>
    </div>
    <div className={styles.user}>
        <div className={styles.username}>Username</div>
        <div className={styles.typing}>typing...</div>
    </div>
    <span className={styles.msgCount}>3</span>
</div> */}
