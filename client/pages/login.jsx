import { useState, useContext } from 'react'
import { UserContext } from '../context'
import AuthForm from '../components/forms/AuthForm'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/login.module.css'

const Login = () => {

    const [email, setEmail] = useState('nikhil@123');
    const [password, setPassword] = useState('123456789');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);

    const handleChange = (target) => {
        setMessage(false)
        target.name === 'name' ? setName(target.value)
        : target.name === 'email' ? setEmail(target.value)
        : setPassword(target.value)
    }

    const reset = () => {
        setEmail('')
        setPassword('')
        Router.push('/')
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const res = await axios.post(`/login`, {
                email, password
            });

            if (res.data.error) {
                setMessage(res.data.error);
                setType(2);
            }
            
            setState({
                user: res.data.userInfo,
                token: res.data.token
            });

            localStorage.setItem('Unicors_User', JSON.stringify(res.data));

            setMessage(res.data.message);
            setType(1);
            
            reset();
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            setMessage(err.message);
            setType(2);
        }
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    }

    if(state && state.token) Router.push('/');

  return (
    <div className={styles.loginWrapper}>
        <span className={styles.bg}>
            <span className={styles.title}>Login</span>
        </span>
        <div className={styles.login}>

            <AuthForm
                email={email}
                password={password}
                visible={visible}
                setVisible={setVisible}
                loading={loading}
                message={message}
                type={type}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                page={'login'}
            />
            <span className={styles.registerLink}>
                Don't have an account?
                <Link href='/register'>
                    <span className={styles.linkText}>Register</span>
                </Link>
            </span>
        </div>
    </div>
   )
}

export default Login