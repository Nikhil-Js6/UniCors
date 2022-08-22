import styles from '../../styles/Messenger.module.css'
import moment from 'moment'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'

const Message = ({ own, message, scrollRef }) => {

    return (
        <div className={ own ? `${styles.message} ${styles.own}` : styles.message } ref={scrollRef}>
            <div className={styles.messageTop}>
                <img className={styles.chatUserImg} src={ message.sender.image?.url || '/noImage.jpg' }/>
                <p className={styles.messageText}>
                    { 
                      !own && 
                        <span className={styles.messageOwnerLeft}>
                            <CaretLeftOutlined />
                        </span> 
                    }
                    { message.text }
                    { 
                       own && 
                        <span className={styles.messageOwnerRight}>
                            <CaretRightOutlined />
                        </span>
                    }
                </p>
            </div>
            <div className={styles.messageBottom}>
                {moment(message.createdAt).fromNow()}
            </div>
        </div>
    )
}

export default Message
