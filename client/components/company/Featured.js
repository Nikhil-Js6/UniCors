import { useContext } from 'react'
import { UserContext } from '../../context'
import Link from 'next/link'
import Typical from 'react-typical'
import { RightOutlined } from '@ant-design/icons'
import styles from '../../styles/About.module.css'

const Featured = () => {

    const [state] = useContext(UserContext);

  return (
    <div className={styles.featured}>
        <div className={styles.featLeft}>
            <h1 className={styles.featuredHeading}>
                Create {' '}<br />
                <Typical
                    loop={Infinity}
                    wrapper='b'
                        steps={[
                        "Posts",
                        1300,
                        "Connections",
                        1300,
                        "Community!",
                        1300,
                    ]}
                />
                </h1>
            <span className={styles.button}>
            {
                <Link href={state ? '/user/profile' : '/login'}>
                    Get Started
                </Link>
            }
                <RightOutlined className={styles.arrow}/>
            </span>
        </div>
        <div className={styles.featRight}>
            <img src={'/company/selfie2.jpg'} className={styles.featImg} alt='' />
        </div>
    </div>
  )
}

export default Featured