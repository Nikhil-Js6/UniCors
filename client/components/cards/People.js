import { useContext } from 'react'
import { UserContext } from '../../context'
import Link from 'next/link'
import styles from '../../styles/Profile.module.css'
import { SyncOutlined } from '@ant-design/icons'

const People = ({ user, handleFollow, handleUnfollow, loading }) => {

    const [state] = useContext(UserContext);

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
        </div>
    )
}

export default People