import { useState, useContext } from 'react'
import { UserContext } from '../context'
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm'
import Router from 'next/router'
import axios from 'axios'
import styles from '../styles/Register.module.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState('nikhil@123');
    const [newPassword, setNewPassword] = useState('123456789');
    const [secret, setSecret] = useState('');
    const [answer, setAnswer] = useState('');
    const [selected, setSelected] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const [state] = useContext(UserContext);

    if (state && state.token) Router.push('/posts');

    const handleChange = (target) => {
        setMessage(false)
        target.name === 'name' ? setName(target.value)
        : target.name === 'email' ? setEmail(target.value)
        : setNewPassword(target.value)
    }

    const reset = () => {
        setEmail('')
        setNewPassword('')
        setAnswer('')
        setTimeout(() => {
            Router.push('/login');
        }, 3000);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`/forgot-password`, {
                email, newPassword, secret, answer
            });
            setMessage(res.data.message);
            setType(1);
            res.status === 200 && reset();
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setMessage(err.message);
            setType(2);
            setLoading(false);
        }
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    }

  return (
    <div className={styles.forgotWrapper}>
        <span className={styles.bg}>
            <span className={styles.title}>Forgot Password</span>
        </span>
        <div className={styles.forgotForm}>
            <ForgotPasswordForm
                email={email}
                newPassword={newPassword}
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
            />
        </div>
    </div>
   )
}

export default ForgotPassword
