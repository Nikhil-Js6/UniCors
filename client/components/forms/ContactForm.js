import styles from '../../styles/Form.module.css'
import { SyncOutlined } from '@ant-design/icons'

const   ContactForm = ({ 
    name, email, subject, text, loading, formRef, handleChange, handleSubmit 
}) => {

    return (
        <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>

            <span className={styles.formItem}>
                <label className={styles.label}>Name</label>
                <input 
                    name='name'
                    value={name}
                    className={styles.input} 
                    type={'text'} 
                    required
                    placeholder='Enter Name'
                    onChange={({ target }) => handleChange(target)}
                />
            </span>

            <span className={styles.formItem}>
                <label className={styles.label}>Email</label>
                <input 
                    name='email'
                    value={email}
                    className={styles.input} 
                    type={'email'} 
                    required
                    placeholder='Enter your Email'
                    onChange={({ target }) => handleChange(target)}
                />
            </span>

            <span className={styles.formItem}>
                <label className={styles.label}>Subject</label>
                <input 
                    name='subject'
                    value={subject}
                    className={styles.input}
                    type={'text'} 
                    required
                    placeholder='Subject'
                    onChange={({ target }) => handleChange(target)}
                />
            </span>

            <span className={styles.formItem}>
                <label className={styles.label}>Message</label>
                <textarea 
                    name='text'
                    value={text}
                    className={`${styles.input} ${styles.textarea}`} 
                    type={'text'} 
                    required
                    placeholder='Write something...'
                    onChange={({ target }) => handleChange(target)}
                />
            </span>

            <button 
                type='submit' 
                className={styles.button}
                disabled={loading}
            >
                { loading ? <SyncOutlined spin /> : 'Submit' }
            </button>
        
        </form>
    )
}

export default ContactForm;