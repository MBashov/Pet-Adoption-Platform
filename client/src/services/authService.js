const baseUrl = 'http://localhost:3030/users';



export default {
    login: async (email, password) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }

        const responce = await fetch(baseUrl, options);
        const result =  responce.json();
       

        return result;
    }
}

