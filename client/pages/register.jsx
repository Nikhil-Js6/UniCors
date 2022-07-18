import { useState, useContext } from 'react'
import { UserContext } from '../context'
import AuthForm from '../components/forms/AuthForm'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/Register.module.css'


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [answer, setAnswer] = useState('');
    const [selected, setSelected] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const [state] = useContext(UserContext);

    if(state && state.token) Router.push('/');

    const handleChange = (target) => {
        setMessage(false)
        target.name === 'name' ? setName(target.value)
        : target.name === 'email' ? setEmail(target.value)
        : setPassword(target.value)
    }

    const reset = () => {
        setName('')
        setEmail('')
        setPassword('')
        setAnswer('')
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`/register`, {
                name, email, password, secret, answer
            });
            console.log(res);
            reset();
            setMessage(res.data.message);
            setType(1);
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            console.log(err);
            setMessage(err.response.data.message);
            setType(2);
        }
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    }

  return (
    <div className={styles.registerWrapper}>
        <span className={styles.bg}>
            <span className={styles.title}>Register</span>
        </span>
        <div className={styles.register}>

            <AuthForm
                name={name}
                email={email}
                password={password}
                secret={secret}
                setSecret={setSecret}
                answer={answer}
                setAnswer={setAnswer}
                selected={selected}
                setSelected={setSelected}
                visible={visible}
                setVisible={setVisible}
                loading={loading}
                message={message}
                type={type}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                page={'register'}
            />
            <span className={styles.loginLink}>
                Already have an account?
                <Link href='/login'>
                    <span className={styles.linkText}>Login</span>
                </Link>
            </span>
        </div>
    </div>
   )
}

export default Register