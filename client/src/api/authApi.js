import { useEffect } from "react";
import request from "../utils/request"

import { useUserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {

    const login = (email, password) =>
        request.post(`${baseUrl}/login`, { email, password });

    return {
        login
    }
};

export const useRegister = () => {

    const register = (email, password) =>
        request.post(`${baseUrl}/register`, { email, password });

    return {
        register,
    }
};

export const useLogout = () => {

    const { accessToken, logoutHandler } = useUserContext();


    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken
            }
        }
        request.get(`${baseUrl}/logout`, null, options)
            .then(logoutHandler())
        //TODO: Fix double fetching 
    }, [accessToken, logoutHandler]);

    return {
        isLoggedOut: !!accessToken
    }
};