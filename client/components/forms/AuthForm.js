import styles from '../../styles/Form.module.css'
import Image from 'next/image'
import { Alert } from '../../utils/Alerts'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'

const AuthForm = ({ 
    name, email, password, page, secret, setSecret, answer, setAnswer, selected, 
    setSelected, visible, setVisible, loading, handleChange, handleSubmit,
}) => (

    <form onSubmit={handleSubmit} className={styles.form}>

    { page === 'register' &&
        <span className={styles.formItem}>
            <label className={styles.label}>Name</label>
            <input 
                name='name'
                value={name}
                className={styles.input} 
                type={'text'} 
                placeholder='Enter your Name'
                required
                onChange={({ target }) => handleChange(target)}
            />
        </span>
    }

        <span className={styles.formItem}>
            <label className={styles.label}>Email</label>
            <input 
                name='email'
                value={email}
                className={styles.input} 
                type={'email'} 
                placeholder='Enter your Email'
                required
                onChange={({ target }) => handleChange(target)}
                disabled={page === 'profile'}
            />
        </span>

        <span className={styles.formItem}>
            <label className={styles.label}>Password</label>
            <input 
                name='password'
                value={password}
                className={styles.input} 
                type={
                    visible ? 'text' : 'password'
                } 
                placeholder='Enter Password'
                required
                onChange={({ target }) => handleChange(target)}
            />
            <div className={styles.visibleImgWrapper}>
                <Image 
                    className={styles.visibility}
                    src={
                        visible 
                        ? '/visibility.png'
                        : '/visibility_off.png'
                    }
                    height={'22px'} width={'22px'}
                    onClick={() => password && setVisible(!visible)}
                />
            </div>
        </span>

    { page === 'register' &&
            <span className={styles.formItem}>
            <label className={styles.label}>Pick a question</label>
            <select
                className={`${styles.input} ${styles.select}`}
                onChange={({ target: { value }}) => setSecret(value.slice(0, -1))}
                onClick={() => setSelected(true)} 
            >
                <option disabled={selected}>Pick a Question</option>
                <option>Which is your favorite color?</option>
                <option>Which is your favorite car?</option>
                <option>What is your D.O.B?</option>
                <option>Which is your favorite dish?</option>
                <option>What is your nickname?</option>
            </select>
        </span>
    }

    { page === 'register' &&
            <span className={styles.formItem}>
            <label className={styles.label}>You can use this as security question</label>
            <input 
                value={answer}
                className={styles.input} 
                type={'text'} 
                placeholder='Your Answer..'
                required={selected}
                onChange={({ target: { value }}) => setAnswer(value)}
            />
        </span>
    }

    { page === 'login' &&
            <span className={styles.formItem}>
                <span className={styles.forgotLink}>
                    <Link href='/forgot-password'>
                        <span className={styles.linkText}>Forgot Password?</span>
                    </Link>
                </span>
            </span>
    }
        
        <button 
            type='submit' 
            className={styles.button}
            disabled={
                page==='login' 
                ? !email || !password || loading
                : !name || !email || !secret || !password || loading
            }
        >
            { loading ? <SyncOutlined spin /> : 'Submit' }
        </button>
    </form>
)

export default AuthForm;
