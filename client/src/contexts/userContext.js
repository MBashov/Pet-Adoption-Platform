import { createContext } from 'react';

export const userContext = createContext({
    _id: '',
    email: '',
    password: '',
    accessToken: '',
    authHandler: () => null,
    logoutHandler: () => null,

});