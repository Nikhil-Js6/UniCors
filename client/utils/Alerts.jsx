import styles from '../styles/Alert.module.css';

export const Alert = (message, type) => {
    return (
        <div 
            className={
               `${styles.message}
                ${type === 1 ? styles.success
                    : type === 2 ? styles.error
                    : styles.info
                }`
            }
        >
            {message}
        </div>
    )
}
