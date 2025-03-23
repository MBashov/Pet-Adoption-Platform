import { useEffect, useState } from "react";

import request from "../utils/request";
import useAuthRequest from "../hooks/useAuthRequest";

const baseUrl = ' http://localhost:3030/data/pets';

export const usePets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setPets);
    }, []);

    return {
        pets
    }
};

export const usePet = (petId) => {
    const [pet, setPet] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${petId}`)
            .then(setPet);
    }, []);

    return {
        pet
    }
};

export const useCreatePet = () => {

    const { authRequest } = useAuthRequest();

    const create = (petData) => {

        authRequest.post(baseUrl, petData);
    }

    return {
        create,
    }
}