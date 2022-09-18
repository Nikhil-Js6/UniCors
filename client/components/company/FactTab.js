import styles from '../../styles/About.module.css'

const OfferTab = ({ src, title, desc }) => {
    return (
        <div className={styles.offerTab}>
            <img className={styles.offerImg} src={`/company/${src}.svg`} alt=''/>
            <div className={styles.offerInfo}>
                <span className={styles.offerTitle}>{title}</span>
                <span className={styles.offerDesc}>{desc}</span>
            </div>
        </div>
    )
}

export default OfferTab