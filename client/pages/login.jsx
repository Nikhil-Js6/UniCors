import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context'
import AuthForm from '../components/forms/AuthForm'
import Router from 'next/router'
import Link from 'next/link'
import { Alert } from '../utils/Alerts'
import styles from '../styles/Login.module.css'
import axios from 'axios'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(false);
    const [demo, setDemo] = useState(true);

    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        if (email === '' || password === '') {
            setDemo(true);
        }
    }, [email, password]);

    const handleChange = (target) => {
        setMessage(false);
        target.name === 'name' ? setName(target.value)
        : target.name === 'email' ? setEmail(target.value)
        : setPassword(target.value);
    }

    const reset = () => {
        setEmail('');
        setPassword('');
        Router.push('/');
    }

    const activateDemo = () => {
        setEmail('demo@123');
        setPassword('12345678');
        setDemo(false);
    }

    const alertMessage = (msg, type) => {
        setLoading(false);
        setMessage(msg);
        setType(type);
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const res = await axios.post(`/login`, {
                email, password
            });
            if (res.data.error) {
                alertMessage(res.data.error, 2);
                return;
            }
            if (res.data) {
                setState({
                    user: res.data.userInfo,
                    token: res.data.token
                });

                localStorage.setItem('Unicors_User', JSON.stringify({ 
                    userInfo: res.data.userInfo, 
                    token: res.data.token 
                }));

                alertMessage(res.data.message, 1);
                reset();
            }
        }
        catch (err) {
            console.log(err);
            alertMessage('Can\'t process request!', 2);
            setLoading(false);
        }
    }

    if(state && state.token) Router.push('/');

  return (
    <div className={styles.loginWrapper}>
        <span className={styles.bg}>
            <span className={styles.title}>Login</span>
        </span>
        <div className={styles.login}>
        { message && Alert(message, type) }
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
            { demo &&
                <span className={styles.demoLink} onClick={() => activateDemo()}>Use Demo Account</span> 
            }
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
