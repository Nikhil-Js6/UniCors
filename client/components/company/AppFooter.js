import { useState } from 'react'
import Link from 'next/link'
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons'
import styles from '../../styles/About.module.css'

const AppFooter = () => {

    const [render, setRender] = useState(false);

    const renderMessage = () => {
        setTimeout(() => {
            setRender({ message: 'Hello User, How are you? 🤖', type: 1 });
        }, 0);
        setTimeout(() => {
            setRender({ message: 'These links are currently inactive!', type: 2});
        }, 2500);
        setTimeout(() => {
            setRender({ message: 'Linked pages will be created soon! 🔥', type: 3});
        }, 5000);
        setTimeout(() => {
            setRender({ message: 'Thank You! 🤖', type: 4 });
        }, 7500);
        setTimeout(() => {
            setRender(false);
        }, 10000);
    }

    const links1 = [
        'UniCors Web',
        'UniCors App',
        'Developer',
        'API\'s',
        'SDK',
        'Versions',
        'Git',
        'Pricing',
    ]

    const links2 = [
        'About Us',
        'Contact Us',
        'Plans',
        'Privacy Policy',
        'Terms & Conditions',
        'Vision',
        'Team',
        'Jobs'
    ]

    const options = [
        'Services',
        'Guidlines',
        'Procedures',
        'Applications',
        'Disclosure',
        'User Guide'
    ]

  return (
    <div className={styles.footer}>
        <img src='/company/wave1.png' className={styles.waveImg} alt='' />
        <div className={styles.footerTop}>
            <div className={styles.footerLeft}>
                <div className={styles.contacts}>
                    <span className={styles.links}>
                        <span className={styles.linkSpan}>
                            <span className={styles.linkHeader}>Contacts</span>
                            <a href='tel:7428423872' className={styles.linkItem}>+91-7428423872</a>
                            <a href='mailto: nikhilpahal2001@gmail.com' className={styles.linkItem}>nikhilpahal2001@gmail.com</a>
                        </span>
                        <span className={styles.linkSpan}>
                            <span className={styles.linkHeader}>Enquiry</span>
                            <a href='tel:7428423872'className={styles.linkItem}>+679-8668-8686</a>
                            <a href='mailto: imsystemanonymous@gmail.com' className={styles.linkItem}>support@crypt-inv.mail</a>
                        </span>
                        <span className={styles.linkSpan}>
                            <span className={styles.linkHeader}>Address</span>
                            <span className={styles.linkItem}>2nd Floor - Vox Studios 1–45 Sector: 295, Gururgram, Haryana.</span>
                            <span className={styles.linkItem}>9th Appartment - Global city, sector: 96, Noida Electric City, UP.</span>
                        </span>
                    </span>
                </div>
                <div className={styles.footerInfo}>
                    <div className={styles.footerLinks}>
                        <span className={styles.links}>
                            <span className={styles.linkHeader}>Products</span>
                        {
                            links1.map(l => (
                                <span className={styles.linkItem} key={Math.random()} onClick={() => renderMessage()}>
                                    {l}
                                </span>
                            ))
                        }
                        </span>
                        <span className={styles.links}>
                            <span className={styles.linkHeader}>Company</span>
                        {
                            links2.map(l => (
                                <Link href='/company/contact'>
                                    <span className={styles.linkItem} key={Math.random()}>
                                        {l}
                                    </span>
                                </Link>
                            ))
                        }
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.footerLogo}>
                <span className={styles.logo}>Uni<span>.Cors</span></span>
                <span className={styles.appSocial}>
                    <span className={styles.iconsWrapper}>
                        <a href='https://www.facebook.com/' target='_blank'>
                            <FacebookOutlined className={styles.icon1} />
                        </a>
                    </span>
                    <span className={styles.iconsWrapper}>
                        <a href='https://instagram.com/nikhilpahal.js/' target='_blank'>
                            <InstagramOutlined className={styles.icon2} />
                        </a>
                    </span>
                    <span className={styles.iconsWrapper}>
                        <a href='https://www.linkedin.com/in/nikhil-kumar-b28a62195/' target='_blank'>
                            <LinkedinOutlined className={styles.icon3} />
                        </a>
                    </span>
                    <span className={styles.iconsWrapper}>
                        <a href='https://twitter.com/KD11039607' target='_blank'>
                            <TwitterOutlined className={styles.icon4} />
                        </a>
                    </span>                    
                </span>
                <span className={styles.appLink}>
                    <img src='/company/app-store.png' alt='' className={styles.storeImg} />
                    <img src='/company/play-store.png' alt='' className={styles.storeImg} />
                </span>
            </div>
        </div>
        { render.message && 
            <span 
                className={ 
                    render.type === 1 
                        ? styles.message : render.type === 2 
                            ? `${styles.message} ${styles.danger}` : render.type === 3  
                                ? `${styles.message} ${styles.info }` : `${styles.message} ${styles.last}`
                }
            >
                {render.message}
            </span>
        }
        <span className={styles.address}>
            UniCors.com is an undertaking of Uni-JS Tech Ltd. Uni-JS Tech Ltd is registered in England & Wales under Company Registration Number 09407280; 
            its registered address is WeWork St. Peter’s Square, 1 St. Peter’s Square, Manchester, M2 3DE. 
            Uni-JS Tech Ltd is authorised and regulated by the England & Wales Fair Conduct Authority. Our FCA number for UniCors is 295_5911_abzy.
        </span>
        <span className={styles.options}>
        {
            options.map(o => (
                <span className={styles.option} key={Math.random()} onClick={renderMessage}>
                    {o}
                </span>
            ))
        }
        </span>
        <span className={styles.warning}>
        🤖Thanks for visiting, have a good day! Some of the features of this application are still under work 
            and will be available soon 🔥
        </span>
    </div>
  )
}

export default AppFooter
