const baseUrl = ' http://localhost:3030/data/pets';

export default {
    getAll: () => {
        const result = fetch(baseUrl)
            .then(res => res.json());

        return result;
    }
}