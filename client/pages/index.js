import AppFooter from "../components/company/AppFooter"
import Facts from "../components/company/Facts"
import Featured from "../components/company/Featured"
import Features from "../components/company/Features"
import Memories from "../components/company/Memories"
import styles from "../styles/Company.module.css"

const About = () => {
    return (
        <div className={styles.aboutWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>About Us</span>
            </span>
            <div className={styles.about}>
                <div className={styles.aboutHead}>
                    <span className={styles.aboutTitle}>Let's Connect from here!</span>
                    <span className={styles.text}>
                        The social media platform to 
                        connect, explore, and share your ideas.
                    </span>
                </div>
            </div>
            <Featured />
            <Features />
            <Memories />
            <Facts />
            <AppFooter />
        </div>
    )
}

export default About
