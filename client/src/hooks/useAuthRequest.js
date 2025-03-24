import { useUserContext } from "../contexts/UserContext"
import request from "../utils/request";

export default function useAuthRequest() {
    const authData = useUserContext();

    const requestWrapper = (method, url, data, options = {}) => {

        const authOptions = {
            ...options,
            headers: {
                ...options.headers,
                'X-Authorization': authData.accessToken
            }
        }

        return request.baseRequest(method, url, data, authData.accessToken ? authOptions : options);
    }

    return {
        ...authData,
        userId: authData._id,
        isAuthenticated: authData.accessToken,
        authRequest: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            delete: requestWrapper.bind(null, 'DELETE'),
        }
    };
}



