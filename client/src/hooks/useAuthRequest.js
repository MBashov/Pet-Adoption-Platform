import { useContext } from "react"
import { userContext } from "../contexts/userContext"
import request from "../utils/request";

export default function useAuthRequest() {
    const authData = useContext(userContext);

    const requestWrapper = (method, url, data, options = {}) => {

        const optionsWrapper = {
            ...options,
            headers: {
                ...options.headers,
                'X-Authorization': authData.accessToken
            }
        }

        return request.baseRequest(method, url, data, authData.accessToken ? optionsWrapper : options);
    }

    return {
        ...authData,
        authRequest: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            del: requestWrapper.bind(null, 'DELETE'),
        }
    };
}



