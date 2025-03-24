import { createContext, useContext } from 'react';


export const UserContext = createContext({
    _id: '',
    email: '',
    password: '',
    accessToken: '',
    authHandler: () => null,
    logoutHandler: () => null,

});

export const useUserContext = () => {
    const data = useContext(UserContext);

    return data;
}