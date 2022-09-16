import { useState, useRef, useEffect, useContext } from "react"
import { UserContext } from "../../context"
import { Alert } from "../../utils/Alerts"
import ContactForm from '../../components/forms/ContactForm'
import styles from "../../styles/Company.module.css"
import emailjs from "emailjs-com"

const contact = () => {

    const [state] = useContext(UserContext);
    const formRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state?.userInfo) {
            setName(state.userInfo.name);
            setEmail(state.userInfo.email);
        }
    },[ state?.token && state?.userInfo]);

    const handleChange = (target) => {
        target.name === 'name' ? setName(target.value)
        : target.name === 'email' ? setEmail(target.value)
        : target.name === 'subject' ? setSubject(target.value)
        : target.name === 'text' && setText(target.value);
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
        setLoading(true);
        await emailjs.sendForm(
            'service_7u1e1zp', 'template_i6l4dn3', formRef.current, 'PZAktj4JF89op77u4')
            .then((result) => {
                console.log(result.text);
                alertMessage('Form submitted successfully, Thanks for contacting us!', 1);
            },
            (error) => {
                console.log(error.text);
                alertMessage('Error in submission. Please try again later!' , 2);
            }
        );
        setLoading(false);
    }

    return (
        <div className={styles.contactWrapper}>
            <span className={styles.bg}>
                <span className={styles.title}>Contact Us</span>
            </span>
            <div className={styles.alertsWrapper}>
                { message && Alert(message, type) }
            </div>
            <div className={styles.contact}>
                <ContactForm 
                    name={name}
                    email={email}
                    subject={subject}
                    text={text}
                    loading={loading}
                    formRef={formRef}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default contact