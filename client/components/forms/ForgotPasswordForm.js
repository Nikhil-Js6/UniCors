import styles from '../../styles/form.module.css'
import Image from 'next/image'
import { Alert } from '../../utils/Alerts'
import { SyncOutlined } from '@ant-design/icons'

const ForgotPasswordForm = ({
    email, newPassword, setSecret, answer, setAnswer, selected, setSelected, visible, 
    setVisible, loading, message, type, handleChange, handleSubmit
}) => (

    <form onSubmit={handleSubmit} className={styles.form}>

        {message && Alert(message, type)}

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
            />
        </span>

        <span className={styles.formItem}>
            <label className={styles.label}>New Password</label>
            <input
                value={newPassword}
                className={styles.input} 
                type={
                    visible ? 'text' : 'password'
                } 
                placeholder='Enter Password'
                required
                min={6}
                onChange={({ target }) => handleChange(target)}
            />
            <div className={styles.imgWrapper}>
                <Image 
                    className={styles.visibility}
                    src={
                        visible 
                        ? '/visibility.png'
                        : '/visibility_off.png'
                    }
                    height={'22px'} width={'22px'}
                    onClick={() => newPassword && setVisible(!visible)}
                />
            </div>
        </span>

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

        <span className={styles.formItem}>
            <label className={styles.label}>Fill your security answer</label>
            <input 
                value={answer}
                className={styles.input} 
                type={'text'} 
                placeholder='Your Answer..'
                required={selected}
                onChange={({ target: { value }}) => setAnswer(value)}
            />
        </span>
        
        <button type='submit' className={styles.button}>
            { loading ? <SyncOutlined spin /> : 'Submit' }
        </button>
    </form>
)

export default ForgotPasswordForm;