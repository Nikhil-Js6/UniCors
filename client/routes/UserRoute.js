import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { UserContext } from '../context' 
import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'

const UserRoute = ({ children }) => {

    const [state] = useContext(UserContext);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.get(`/verify-user`);

                if (!data.verified) {
                    Router.push('/login');
                }
                setVerified(true);
            }
            catch (err) {
                setTimeout(() => {
                    Router.push('/login');
                    console.log(err);
                }, 100);
            }
        }
        verifyUser();
    }, [state && state.token]);

    return !verified 
       ? ( <SyncOutlined spin color='primary'/> ) 
       : ( <> {children} </>)
}

export default UserRoute;
