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

        const searchParams = new URLSearchParams({
            select: '_id,imageUrls,name,breed,age',
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
            select: '_id,imageUrls,name,breed,age',
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
    const [isLoading, setIsLoading] = useState(false);

    const create = async (petData) => {
        setIsLoading(true);

        try {
            return authRequest.post(baseUrl, petData);
        } finally {
            setIsLoading(false);
        }
    }

    return { create, isLoading }
}

export const useEditPet = () => {

    const { authRequest } = useAuthRequest();
    const [loading, setloading] = useState(false);

    const edit = async (petData, petId) => {
        setloading(true);

        try {
            return authRequest.put(`${baseUrl}/${petId}`, { ...petData, _id: petId });
        } finally {
            setloading(false)
        }
    }

    return { edit, loading }
}

export const useDeletePet = () => {

    const { authRequest } = useAuthRequest();

    const del = (petId) => authRequest.delete(`${baseUrl}/${petId}`);

    return {
        del,
    }
}