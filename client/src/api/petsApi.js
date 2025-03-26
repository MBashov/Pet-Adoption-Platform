import { useEffect, useState } from "react";

import request from "../utils/request";
import useAuthRequest from "../hooks/useAuthRequest";

const baseUrl = ' http://localhost:3030/data/pets';


export const usePets = () => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {

        const controller = new AbortController();

        setIsLoading(true);
        request.get(baseUrl, null, { signal: controller.signal })
            .then((result) => {
                setPets(result);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            })
            .finally(() => setIsLoading(false));

        return () => controller.abort();

    }, []);

    return { pets, isLoading, error, }
};

export const useLatestPets = () => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,imageUrl,name,breed,age',
        });

        setIsLoading(true);

        request.get(`${baseUrl}?${searchParams.toString()}`, null, { signal: controller.signal })
            .then((result) => {
                setPets(result);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            })
            .finally(() => setIsLoading(false));

        return () => controller.abort();
    }, []);

    return { pets, isLoading, error }
};

export const usePet = (petId) => {
    const [pet, setPet] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);

        request.get(`${baseUrl}/${petId}`, null, { signal: controller.signal })
            .then((result) => {
                setPet(result);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            })
            .finally(() => setIsLoading(false));

        return () => controller.abort();
    
    }, [petId]);
    
    return { pet, isLoading, error } 
};

export const useCreatePet = () => {

    const { authRequest } = useAuthRequest();

    const create = (petData) => authRequest.post(baseUrl, petData);

    return {
        create,
    }
}

export const useEditPet = () => {

    const { authRequest } = useAuthRequest();

    const edit = (petData, petId) => authRequest.put(`${baseUrl}/${petId}`, { ...petData, _id: petId });

    return {
        edit,
    }
}

export const useDeletePet = () => {

    const { authRequest } = useAuthRequest();

    const del = (petId) => authRequest.delete(`${baseUrl}/${petId}`);

    return {
        del,
    }
}