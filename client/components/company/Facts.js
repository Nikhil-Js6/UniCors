import OfferTab from './FactTab'
import styles from '../../styles/About.module.css'
import { RightOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Facts = () => {
    return (
        <div className={styles.offerWrapper}> 
            <img className={styles.offersWave} src='/company/wave7.png' alt=''/>
            <span className={styles.offerSpan}>What we offer</span>
            <h1 className={styles.offerHeading}>Everything at your <span>fingertips</span></h1>
            <div className={styles.offers}>
                <div className={styles.offerLeft}>
                    <OfferTab
                        src='fees'
                        title='Fact 1:'
                        desc='Clicking a nice picture can instantly reduce stress levels by 20% '
                    />
                    <OfferTab
                        src='transparency'
                        title='Fact 3: '
                        desc={`Not liking your friend's posts can result in bad grades in exam!`}
                        // desc={`We'll tell you what you're paying in pounds and pence. No more confusing financial jargon or mental maths.`}
                    />
                    <OfferTab
                        src='access'
                        title='Fact 5:'
                        desc={`Liking someone's pics leds to a better health and performance`}
                    />
                </div>
                <div className={styles.offerCentre}>
                    <img className={styles.offerPhone} src='/company/phone.png' alt=''/>
                </div>
                <div className={styles.offerRight}>
                    <OfferTab
                        src='access'
                        title='Fact 2:'
                        desc='Sharing those nice pics can greatly reduce stress levels even by 30%.'
                    />
                    <OfferTab
                        src='world'
                        title='Fact 4:'
                        desc='Minimise your exam risks by liking all those posts now for better results.'
                    />
                    <OfferTab
                        src='access'
                        title='Fact 6:'
                        desc='Sharing those nice pics can greatly reduce stress levels even by 30%.'
                    />
                </div>
            </div>
            <span className={styles.button}>
                {
                    <Link href={'/posts'}>
                        Explore Posts!
                    </Link>
                }
                <RightOutlined className={styles.arrow}/>
            </span>
            <img className={styles.offersWaveBottom} src='/img/wave3.png' alt=''/>
        </div>
    )
}

export default Facts