import { createContext } from 'react';

export const userContext = createContext({
    _id: '',
    email: '',
    password: '',
    authHandler: (authData) => null,

});