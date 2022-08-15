import PostCard from "./PostCard"
import styles from "../../styles/PublicProfile.module.css"

const ProfilePostCard = ({ user, currentUser, userPosts, fetchUserPosts }) => {
    return (
        <div className={styles.post}>
            {  
                user?.status === 'private' 
                && currentUser?._id !== user?._id 
                && !user?.followers?.includes(currentUser?._id)
              ? <span className={styles.private}>
                    <span>This account is private!</span>
                    <span>Follow to see posts</span>
                </span>
              : userPosts.length 
                   ? <PostCard userPosts={userPosts} fetchUserPosts={fetchUserPosts}/> 
                   : <div className={styles.noPosts}>No Posts!</div>
            }
        </div>
    )
}

export default ProfilePostCard