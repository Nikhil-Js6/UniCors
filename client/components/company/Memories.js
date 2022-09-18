import Link from 'next/link'
import { RightOutlined } from '@ant-design/icons'
import styles from '../../styles/About.module.css'

const Memories = () => {

    return (
        <div className={styles.memories}>
            <h1 className={styles.memoriesHeading}>
                Create and Share <span>Memories!</span>
            </h1>
            <span className={styles.button}>
            {
                <Link href={'/posts'}>
                    <a>Join Now!</a>
                </Link>
            }
                <RightOutlined className={styles.arrow}/>
            </span>
        </div>
    )
}

export default Memories