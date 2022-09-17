import Link from 'next/link'
import styles from '../../styles/Profile.module.css'
import { SyncOutlined } from '@ant-design/icons'

const FollowCard = ({ page, userArray, loading, handleUnfollow, handleRemove }) => {

    return (
        userArray.length
            ? userArray.map((user) => (
                <div className={styles.following}>
                    <span className={styles.peopleInfoWrapper}>
                    { 
                        user.image
                            ? <span className={styles.peopleImgWrapper}>
                                <img className={styles.peopleImg} src={user.image.url} style={{ width: 36 }} />
                            </span>
                            : <span className={styles.peopleImgWrapper}>
                                <img className={styles.peopleImg} src='/noImage.jpg' style={{ width: 36 }} />
                            </span>
                    }
                        <span className={styles.username}>
                            <Link href={`/user/profile/${user._id}`}>
                                {user.name}
                            </Link>
                        </span>
                    </span>
                {
                    page === 'followers' 
                        ? <span 
                            className={styles.remove}  
                            onClick={() => handleRemove(user)}
                        >
                            {loading ? <SyncOutlined spin /> : 'Remove'}
                        </span>
                    : page === 'followings'
                        && <span 
                            className={styles.unfollow}  
                            onClick={() => handleUnfollow(user)}
                        >
                            {loading ? <SyncOutlined spin /> : 'Unfollow'}
                        </span>
                }
                </div>
            ))
        
            :  <div className={styles.noPosts}>No Followers!</div>
    )
}

export default FollowCard
