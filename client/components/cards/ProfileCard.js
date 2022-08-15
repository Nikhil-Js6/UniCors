import Link from 'next/link';
import { SyncOutlined } from '@ant-design/icons';
import styles from '../../styles/PublicProfile.module.css'

const ProfileCard = ({ user, currentUser, userPosts, followers, followings, loading,  handleFollow, handleUnfollow }) => {

    const ringColors = [
        '#555',
        '#ff7f00',
        '#2681f0',
        '#9f9f9f',
        '#f67b52',
        '#e74c3c',
        '#f09c26',
        '#f02677',
        '#26f0ba',
        '#30f026',
        '#ab46f9',
        '#26dff0',
    ]

    const color = ringColors[Math.floor(Math.random() * 12)];

    return (
        <div className={styles.profileCard}>
            <div className={styles.cardHead}>
                <span>
                    <img className={styles.userImg} src={user?.image?.url || '/noImage.jpg'} style={{ border: `3px double ${color}` }}/>
                </span>
                <div className={styles.userInfo}>
                    <div className={styles.followInfo}>
                        <span className={styles.posts}>
                            { 
                                ! userPosts.length
                                ? 'No Post' 
                                :  userPosts.length === 1 
                                    ?  '1 Post'
                                    :  `${  userPosts.length } Posts`
                            }
                        </span>
                        <span className={styles.followers}>
                            <Link href={`/user/followers/${user?._id}`}>
                                <a>{followers?.length} Followers</a>
                            </Link>
                        </span>
                        <span className={styles.followings}>
                            <Link href={`/user/followings/${user?._id}`}>
                                <a>{followings?.length} Followings</a>
                            </Link>
                        </span>
                    </div>
                    
                    <div className={styles.buttons}>
                    {
                        currentUser?._id !== user?._id ?
                        (
                            user?.followers?.includes(currentUser?._id)
                            ? <span 
                                className={`${styles.button} ${styles.unfollow}`} 
                                onClick={() => handleUnfollow(user)}
                            >
                                { loading ?  <SyncOutlined /> : 'Unfollow'}
                            </span>
                            : <span 
                                className={`${styles.button} ${styles.follow}`}
                                onClick={() => handleFollow(user)}
                            >
                                { loading ? <SyncOutlined /> :'Follow'}
                            </span>
                        ) : (
                            <span className={`${styles.button} ${styles.unfollow}`}>
                                <Link href={`/user/profile/update`}>
                                    <a>Edit Profile</a>
                                </Link>
                            </span>
                        )
                    }
                    </div>
                </div>
            </div>
            <div className={styles.cardBody}>
                <span className={styles.username}>{user?.username}</span>
                <span className={styles.name}>{user?.name}</span>
                <span className={styles.about}>
                    { user?.about || `Hello everyone, I am ${user?.name}`}
                </span>
            </div>
        </div>
    )
}

export default ProfileCard
