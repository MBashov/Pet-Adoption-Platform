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

        const responce = await fetch(`${baseUrl}/login`, options);
        const result =  responce.json();
       

        return result;
    }, 

    register: async (userData) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: userData.email, password: userData.password })
        }

        const responce = await fetch(`${baseUrl}/register`, options);
        const result =  await responce.json();
       
        console.log(result);
        
        return result;
    }, 
}

