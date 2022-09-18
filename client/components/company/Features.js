import { useState, useContext } from 'react'
import { UserContext } from '../../context'
import Link from 'next/link'
import Typical from 'react-typical'
import { RightOutlined } from '@ant-design/icons'
import styles from '../../styles/About.module.css'

const Featured = () => {

    const [state] = useContext(UserContext);

  return (
    <div className={styles.features}>
        <div className={styles.featuresLeft}>
            <img src={'/company/comm3.jpg'} className={styles.featImg} alt='' />
        </div>
        <div className={styles.featuresRight}>
            <h1 className={styles.featuresHeading}>
                Click with <span>Someone</span> and Share with <span>Everyone!</span>
            </h1>
            <span className={styles.button}>
            {
                <Link href={state ? '/user/profile' : '/login'}>
                    Start Sharing!
                </Link>
            }
                <RightOutlined className={styles.arrow}/>
            </span>
        </div>
        <img className={styles.featWaveImg} src={'/company/wave3.png'} alt='' />
    </div>
  )
}

export default Featured