import { useEffect, useState } from "react";
import request from "../utils/request";

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