import { useState, useEffect, createContext } from "react";
import axios from "axios";
import Router from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [state, setState] = useState({
        user: {},
        token: ''
    });

    useEffect(() => {
        setState(JSON.parse(localStorage.getItem('Unicors_User')));
    }, []);

    const token = state && state.token ? state.token : '';

    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            let res = error.response;
            if (res.status === 403 && res.config && res.config.__isRetryRequest) {
                setState(null);
                localStorage.removeItem('Unicors_User');
                Router.push('/login');
            }
        }
    );

    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };
