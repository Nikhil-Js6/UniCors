import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import UserRoute from '../../../routes/UserRoute'
import ProfileForm from '../../../components/forms/ProfileForm'
import axios from 'axios'
import styles from '../../../styles/Register.module.css'


const ProfileUpdate = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [about, setAbout] = useState('');
    const [secret, setSecret] = useState('');
    const [answer, setAnswer] = useState('');
    const [selected, setSelected] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const [state] = useContext(UserContext);

    useEffect(() => {
        if(state && state.userInfo) {
            setName(state.userInfo.name);
            setEmail(state.userInfo.email);
            setUsername(state.userInfo._id);
        }
    }, [state && state.userInfo]);

    const handleChange = (target) => {
        setMessage(false)
        target.name === 'name' ? setName(target.value)
        : target.name === 'email' ? setEmail(target.value)
        : setPassword(target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`/profile-update`, {
                name, email, password, username, about, secret, answer
            });
            setMessage(res.data.message);
            setType(1);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setMessage(err.response.data.message);
            setType(2);
            setLoading(false);
        }
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    }

  return (
    <UserRoute>
        <div className={styles.profileWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>Update Profile</span>
            </span>
            <div className={styles.profile}>

                <ProfileForm
                    name={name}
                    email={email}
                    password={password}
                    username={username}
                    setUsername={setUsername}
                    about={about}
                    setAbout={setAbout}
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
    </UserRoute>
   )
}

export default ProfileUpdate
