import request from "../utils/request";

const baseUrl = 'http://localhost:3030/users';

export default {

    login: (email, password) => {
        return request.post(`${baseUrl}/login`, { email, password });
    },

    register: (userData) => {
        return request.post(`${baseUrl}/register`, { email: userData.email, password: userData.password });
    }
}