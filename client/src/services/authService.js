import request from "../utils/request";

const baseUrl = 'http://localhost:3030/users';

export default {

    login: (userData) => {
        return request.post(`${baseUrl}/login`, { email: userData.email, password: userData.password });
    },

    register: (userData) => {
        return request.post(`${baseUrl}/register`, { email: userData.email, password: userData.password });
    }
}