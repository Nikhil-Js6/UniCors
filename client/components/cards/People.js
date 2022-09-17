import { useContext } from 'react'
import { UserContext } from '../../context'
import Link from 'next/link'
import { SyncOutlined } from '@ant-design/icons'
import styles from '../../styles/Profile.module.css'
import axios from 'axios'

const People = ({ user, messenger, setConversationId, handleFollow, handleUnfollow, loading }) => {

    const [state] = useContext(UserContext);

    const handleConversation = async (recieverId) => {
        try {
            const conversation = await axios.post('/conversation', {
                senderId: state.userInfo._id,
                recieverId
            });
            setConversationId(conversation.data._id);
        } 
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.listUser}>
            <span className={styles.peopleInfoWrapper}>
            { user.image
                ? <span className={styles.peopleImgWrapper}>
                    <img className={styles.peopleImg} src={user.image?.url}/>
                </span>
                : <span className={styles.peopleImgWrapper}>
                    <img className={styles.peopleImg} src='/noImage.jpg' />
                </span>
            }
                <span className={styles.username}>
                    <Link href={`/user/profile/${user._id}`}>
                        {user.name}
                    </Link>
                </span>
            </span>
            {
              !messenger ?
                <>
                {
                    
                    user.followers.includes(state?.userInfo?._id) 
                    ? <span 
                        className={styles.unfollow}  
                        onClick={() => handleUnfollow(user)}
                    >
                        { loading ? <SyncOutlined /> : 'Unfollow'}
                    </span>
                    : <span 
                        className={styles.follow}  
                        onClick={() => handleFollow(user)}
                    >
                        { loading ? <SyncOutlined /> : 'Follow'}
                    </span>
                }
                </> 
                : <>
                    <span 
                        className={styles.follow}  
                        onClick={() => handleConversation(user._id)}
                    >
                        { loading ? <SyncOutlined /> : 'Message'}
                    </span>
                </>
            }
        </div>
    )
}

export default People
