const request = async (method, url, data, options = {}) => {

    if (method !== 'GET') {
        options.method = method
    }

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        }
    }
    
    const responce = await fetch(url, options);
    if (responce.status === 204) {
        return
    }

    if (!responce.ok) {
        const error = await responce.json();
        //TODO Logout and clear local storage if invalid access token
        throw error;
    }

    const result = await responce.json();

    return result;
}
export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    del: request.bind(null, 'DELETE'),
    baseRequest: request
}