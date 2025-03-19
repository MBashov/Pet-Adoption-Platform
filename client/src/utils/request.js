const request = async (method, url, data) => {

    const options = {
        method,
        headers: {},
    }

    if (data !== undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const responce = await fetch(url, options);
    const result = await responce.json();

    return result;
}

export default {
    get: (url) => request('GET', url),
    post: (url, data) => request('POST', url, data),
    put: (url, data) => request('PUT', url, data),
    del: (url) => request('DELETE', url),
}