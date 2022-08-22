import styles from '../../styles/Form.module.css'
import { DeleteOutlined, LoadingOutlined, PlusOutlined,  } from '@ant-design/icons'

const ProfileImageForm = ({ image, setImage, uploading, handleImage }) => {
    return (
        <div className={styles.imgWrapper}>
        {
            uploading ? (
                <div className={styles.imgWrapper}>
                    <LoadingOutlined className={styles.loader}/>
                </div>
            ) : image && image.url ? (
                <div className={styles.imgWrapper}>
                    <img src={image.url} className={styles.previewImage} alt='profile image' />
                </div> 
            ) : (
                <div className={styles.imgWrapper}>
                    <img src={'/noImage.jpg'} className={styles.previewImage} alt='profile image' />
                </div>
            )
        }

            <span className={styles.iconsWrapper}>
                <label className={styles.imgLabel}>
                    <span className={`${styles.iconWrapper} ${styles.plusIconWrapper}`}>
                        <PlusOutlined className={styles.camIcon}/>
                        <input onChange={e => handleImage(e)} type='file' accept='images/*' hidden/>
                    </span>
                </label>
                
                <span 
                    className={`${styles.iconWrapper} ${styles.deleteIconWrapper}`}
                    onClick={() => setImage('')}
                >
                    <DeleteOutlined />
                </span>
            </span>
        </div>
    )
}

export default ProfileImageForm