import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import UserRoute from '../../../routes/UserRoute'
import { Alert } from '../../../utils/Alerts'
import ProfileImageForm from '../../../components/forms/ProfileImageForm'
import UpdateProfileForm from '../../../components/forms/ProfileForm'
import styles from '../../../styles/Register.module.css'
import axios from 'axios'

const ProfileUpdate = () => {

    const [state, setState] = useContext(UserContext);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState({});
    const [about, setAbout] = useState('');

    const [message, setMessage] = useState(null);
    const [type, setType] = useState(0);

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if(state && state.userInfo) {
            setName(state.userInfo?.name);
            setUsername(state.userInfo?.username);
            setEmail(state.userInfo?.email);
            setAbout(state.userInfo?.about);
            setImage(state.userInfo?.image);
            setStatus(state.userInfo?.status);
        }
    }, [state && state.userInfo]);

    const handleChange = (target) => {
        setMessage(false)
        target.name === 'name' ? setName(target.value)
        : target.name === 'username' ? setUsername(target.value)
        : target.name === 'about' ? setAbout(target.value)
        : target.name === 'password' ? setPassword(target.value)
        : setStatus(target.value);
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
        if (password.length && password.length < 6) {
            alertMessage('Password must be at least 6 characters long', 2);
            return;
        }
        try {
            setLoading(true);
            const res = await axios.put('/update-profile', {
                name, username, status, email, password, about, image
            });
            setPassword('');
            if (res.data.error) {
                alertMessage(res.data.error, 2);
                return;
            }
            if (res.data) {
            // set localstorage
                let user = JSON.parse(localStorage.getItem('Unicors_User'));
                user.userInfo = res.data.updatedUser;
                localStorage.setItem('Unicors_User', JSON.stringify(user));
            //set context
                setState({
                    token: state.token,
                    user: res.data.updatedUser,
                });
                alertMessage(res.data.message, 1);
            }
        }
        catch (err) {
            console.log(err);
            alertMessage('Something went wrong!', 2);
        }
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    }

    const handleImage = async e => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const { data } = await axios.post('/upload-image', formData);
            setImage({
                url: data.url,
                public_id: data.public_id
            });
            setUploading(false);
        } 
        catch (err) {
            console.log(err);
            setUploading(false);
        }
    }

  return (
    <UserRoute>
        <div className={styles.profileWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>Update Profile</span>
            </span>
            
            <div className={styles.profile}>
                { message && Alert(message, type) }
                <ProfileImageForm 
                    image={image}
                    setImage={setImage}
                    uploading={uploading}
                    handleImage={handleImage}
                />
                <UpdateProfileForm
                    name={name}
                    username={username}
                    email={email}
                    password={password}
                    status={status}
                    setstatus={setStatus}
                    about={about}
                    setAbout={setAbout}
                    visible={visible}
                    setVisible={setVisible}
                    loading={loading}
                    message={message}
                    type={type}
                    handleChange={handleChange}
                    handleImage={handleImage}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    </UserRoute>
   )
}

export default ProfileUpdate
