import { useEffect, useState } from "react";

import request from "../utils/request";
import useAuthRequest from "../hooks/useAuthRequest";

const baseUrl = ' http://localhost:3030/data/pets';


export const usePets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        request.get(baseUrl, null, { signal: controller.signal })
            .then((data) => {
                setPets(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err);
                    setLoading(false);
                }
            })

        return () => controller.abort();

    }, []);

    return { pets, loading, error, }
};

export const useLatestPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,imageUrl,name,breed,age',
        });

        request.get(`${baseUrl}?${searchParams.toString()}`, null, { signal: controller.signal })
            .then(setPets);
        //TODO error handling

        return () => controller.abort();
    }, []);

    return {
        pets
    }
};

export const usePet = (petId) => {
    const [pet, setPet] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        request.get(`${baseUrl}/${petId}`, null, { signal: controller.signal })
            .then(setPet);
        //TODO Error handling

        return () => controller.abort();
    }, [petId]);

    return {
        pet
    }
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