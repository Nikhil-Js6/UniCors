import { CameraOutlined, MessageOutlined, PlusOutlined, VideoCameraOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from '../../styles/CreatePost.module.css'

const CreatePost = ({ content, image, loading, uploading, setContent, setMessage, handleCreate, handleImage }) => {

    const handleChange = e => {
        setContent(e.target.value);
        setMessage('');
    }

    return (
        <div className={styles.formWrapper}>
            <form onSubmit={handleCreate} className={styles.createPostForm}>
            {
                image && image.url ? (
                    <div className={styles.imgWrapper}>
                        <img src={image.url} className={styles.previewImage}/>
                    </div>
                ) : uploading && (
                    <div className={styles.imgWrapper}>
                        <LoadingOutlined className={styles.loader}/>
                    </div>
                )
            }
                <input
                    placeholder='Write something...'
                    value={content}
                    onChange={e => handleChange(e)} 
                    className={styles.postInput}
                />
                <div className={styles.bottomWrapper}>
                    <span className={styles.iconsWrapper}>
                        <label className={styles.imgLabel}>
                            <span className={`${styles.iconWrapper} ${styles.camIconWrapper}`}>
                                <CameraOutlined className={styles.camIcon}/>
                                <input onChange={e => handleImage(e)} type='file' accept='images/*' hidden/>
                            </span>
                        </label>
                        <label className={styles.imgLabel}>
                            <span className={`${styles.iconWrapper} ${styles.vidIconWrapper}`}>
                                <VideoCameraOutlined className={styles.vidIcon}/>
                                <input onChange={e => handleImage(e)} type='file' accept='images/*' hidden/>
                            </span>
                        </label>
                        <label className={styles.imgLabel}>
                            <span className={`${styles.iconWrapper} ${styles.messageIconWrapper}`}>
                                <MessageOutlined className={styles.messageIcon}/>
                                <input onChange={e => handleImage(e)} type='file' accept='images/*' hidden/>
                            </span>
                        </label>
                        <label className={styles.imgLabel}>
                            <span className={`${styles.iconWrapper} ${styles.camIconWrapper}`}>
                                <PlusOutlined className={styles.camIcon}/>
                                <input onChange={e => handleImage(e)} type='file' accept='images/*' hidden/>
                            </span>
                        </label>
                    </span>
                    <span className={styles.buttonWrapper}>
                        <button disabled={!content} className={styles.postButton}>
                            {loading ? <LoadingOutlined /> : 'Create Post'}
                        </button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default CreatePost