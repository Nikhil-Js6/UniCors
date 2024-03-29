import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context'
import Router from 'next/router'
import styles from '../styles/Navbar.module.css'
import { CaretDownOutlined, CaretUpFilled, CopyrightOutlined, 
    CustomerServiceOutlined, EditOutlined, InfoCircleOutlined, 
    LogoutOutlined, MessageOutlined, QuestionCircleOutlined, 
    SettingOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons'

const Navbar = () => {

    const [state, setState] = useContext(UserContext);

    const [user, setUser] = useState(state?.userInfo || {});

    const [current, setCurrent] = useState('');
    const [options, setOptions] = useState(false);

    const [notify, setNotify] = useState(2);
    const [notification, setNotification] = useState(true);

    useEffect(() => {
        window && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    useEffect(() => {
        if (state && state.userInfo) {
            setUser(state.userInfo);
        }
    }, [state && state.userInfo]);

    const handleOptions = () => {
        setNotify(false);
        setOptions(!options)
    }

    const navigateTo = (pathname) => {
        setOptions(false);
        pathname !== undefined && Router.push({ pathname });
    }

    const logout = () => {
        localStorage.removeItem('Unicors_User');
        setState(null);
        Router.push('/login');
    }

    const navbarOption = (name, pathname) => {
        return (
            <span className={styles.navbarOption}>
                <span onClick={() => navigateTo(pathname)} className={current === pathname ? styles.active : styles.link}>
                    { name }
                </span>
            </span>
        )
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <img src='/logo.png' className={styles.logoImg}/>
                <h3 className={styles.logo}>UniCors</h3>
            </div>
            <div className={styles.right}>
            { 
              state === null
                ? 
                    <>
                        <span className={styles.authWrapper}>
                            { navbarOption('Login', '/login') }
                            { navbarOption('Register', '/register') }
                        </span>
                        
                        <span className={styles.menu} onClick={() => setOptions(!options)}>
                            <MenuOutlined />
                        </span>
                        {
                          options &&
                            <div className={styles.profileOptions}>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/about')}>
                                        About
                                        <span className={styles.optionIcon}>
                                            <InfoCircleOutlined />
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/contact')}>
                                        Contact
                                        <span className={styles.optionIcon}>
                                            <CopyrightOutlined />
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/support')}>
                                        Support
                                        <span className={styles.optionIcon}>
                                            <CustomerServiceOutlined />
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/terms')}>
                                        Terms of Service
                                        <span className={styles.optionIcon}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </span>
                                </div>
                            </div>
                        }
                    </>
                :   <>
                        { navbarOption('Posts', '/posts') }
                        <span className={`${styles.navbarOption} ${styles.messengerText}`}>
                            <span onClick={() => navigateTo('/messenger')} className={current === '/messenger' ? styles.active : styles.link}>
                                Messenger
                            </span>
                        </span>
                        { navbarOption(state?.userInfo?.name || 'Feed', '/user/profile')}
                        { state?.userInfo?.role === 'admin' && navbarOption('Admin', '/admin') }

                        <span className={styles.navbarOption} onClick={() => handleOptions()}>
                            { state?.notification?.length && 
                                <span className={styles.notify}>
                                    {state?.notification?.length}
                                </span> 
                            }
                            <img className={styles.navbarUserImg} src={ user?.image?.url || '/noImage.jpg' }/>
                            { options ? <CaretUpFilled /> : <CaretDownOutlined /> }
                        </span>
                        {
                          options &&
                            <div className={styles.profileOptions}>

                                <span className={styles.option}>
                                    <span  onClick={() => navigateTo('/user/profile')} className={current.split('/').length > 2 ? styles.active : styles.link}>
                                        {(state?.userInfo?.name) || 'Posts'}
                                    </span>
                                </span>
                                <div className={styles.option}>
                                    <span  onClick={() => navigateTo(`/user/profile/${user?._id}`)} >
                                        Profile
                                        <span className={styles.optionIcon}><UserOutlined /></span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    Edit profile
                                    <span className={styles.optionIcon}><EditOutlined /></span>
                                </div>
                                <div className={styles.option}>
                                    <span  className={styles.optionSpan} onClick={() => navigateTo(`/user/profile/update`)}>
                                        <span>
                                            Update Profile <SettingOutlined />
                                        </span>
                                        
                                        <span 
                                            className={styles.notification} 
                                            onClick={() => setNotification(false)}>
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span className={styles.optionSpan} onClick={() => navigateTo('/messenger')}>
                                        <span>
                                            Chats <MessageOutlined />
                                        </span>
                                        {
                                        notification && 
                                            <span 
                                                className={styles.notification} 
                                                onClick={() => setNotification(false)}>
                                            </span>
                                        }
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/about')}>
                                        About
                                        <span className={styles.optionIcon}>
                                            <InfoCircleOutlined />
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/contact')}>
                                        Contact
                                        <span className={styles.optionIcon}>
                                            <CopyrightOutlined />
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/support')}>
                                        Support
                                        <span className={styles.optionIcon}>
                                            <CustomerServiceOutlined />
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={() => navigateTo('/company/terms')}>
                                        Terms of Service
                                        <span className={styles.optionIcon}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.option}>
                                    <span onClick={logout}>
                                        Logout 
                                        <LogoutOutlined />
                                    </span>
                                </div>
                            </div>
                        }
                    </>
            }
            </div>
        </div>
    )
}

export default Navbar
