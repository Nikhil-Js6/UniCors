import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.copyright}>
           <p>Made with ❤️ by <span className={styles.colored}><a href="https://nikhil-js6.netlify.app/" target="blank">Nikhil</a></span><span style={{color: 'gold', fontSize: '12px'}}>@UniCorus</span></p>
        </div>
    )
}
