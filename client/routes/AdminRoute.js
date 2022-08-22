import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { UserContext } from '../context' 
import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'

const AdminRoute = ({ children }) => {

    const [state] = useContext(UserContext);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const { data } = await axios.get(`/verify-admin`);
                if (data.verified) {
                    setVerified(true);
                }
            }
            catch (err) {
                console.log(err);
                setVerified(false);
                Router.push('/');
            }
        }
        verifyAdmin();
    }, [state && state.token]);

    return !verified 
       ? ( <SyncOutlined spin color='primary'/> ) 
       : ( <> {children} </>)
}

export default AdminRoute;