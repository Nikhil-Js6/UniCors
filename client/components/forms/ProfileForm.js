import styles from '../../styles/Form.module.css'
import Image from 'next/image'
import { SyncOutlined } from '@ant-design/icons'

const UpdateProfileForm = ({ 
    name, username, email, password, about, setAbout, visible, 
    setVisible, loading, handleChange, handleSubmit
}) => {

    return (
        <form onSubmit={handleSubmit} className={styles.profileForm}>

            <span className={styles.formItem}>
                <label className={styles.label}>Username</label>
                <input 
                    name='username'
                    value={username}
                    className={styles.input} 
                    type={'text'} 
                    placeholder='Enter Username'
                    onChange={({ target }) => handleChange(target)}
                />
            </span>

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



            <span className={styles.formItem}>
                <label className={styles.label}>Email</label>
                <input 
                    name='email'
                    value={email}
                    className={styles.input} 
                    type={'email'} 
                    placeholder='Enter your Email'
                    disabled={true}
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

            <span className={styles.formItem}>
                <label className={styles.label}>About</label>
                <input 
                    name='about'
                    value={about}
                    className={styles.input} 
                    type={'text'} 
                    placeholder='Write about yourself'
                    onChange={({ target }) => setAbout(target.value)}
                />
            </span>

            <span className={styles.formItem}>
                <label className={styles.label}>Account Status</label>
                <span className={styles.status}>
                    <span className={styles.statusInput}>
                        <label className={styles.statusLabel}>    
                            <input 
                                name='status'
                                type='radio'
                                value={'public'}
                                onChange={({ target }) => handleChange(target)}
                            />
                            Public
                        </label>
                    </span>
                    <span className={styles.statusInput}>
                        <label className={styles.statusLabel}>       
                            <input 
                                name='status'
                                type='radio'
                                value={'private'}
                                onChange={({ target }) => handleChange(target)}
                            />
                            Private
                        </label>
                    </span>
                </span>
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

export default UpdateProfileForm;