import { useEffect, useContext, useRef } from "react";
import request from "../utils/request"

import { userContext } from "../contexts/userContext";

const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {

    const login = (email, password) => {
        return request.post(`${baseUrl}/login`, { email, password });
    }

    return {
        login
    }
};

export const useRegister = () => {

    const register = (email, password) => {
        return request.post(`${baseUrl}/register`, { email, password });
    }

    return {
        register,
    }
};

export const useLogout = () => {

    const { accessToken } = useContext(userContext);
    const { logoutHandler } = useContext(userContext);

    useEffect(() => {
        const options = {
            headers: {
                'X-Authorization': accessToken
            }
        }
        request.get(`${baseUrl}/logout`, null, options)
            .then(logoutHandler())
            //TODO: Fix double fetching 
    }, []);

    return {
        isLoggedOut: !!accessToken
    }
};