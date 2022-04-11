import Link from 'next/link'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <h3 className={styles.logo}>UniCorus</h3>
            </div>
            <div className={styles.right}>
                <span className={styles.navbarOption}>
                    <Link href={'/'}>Home</Link>
                </span>
                <span className={styles.navbarOption}>
                    <Link href={'/login'}>Login</Link>
                </span>
                <span className={styles.navbarOption}>
                    <Link href={'/register'}>Register</Link>
                </span>
            </div>
        </div>
    )
}

export default Navbar
