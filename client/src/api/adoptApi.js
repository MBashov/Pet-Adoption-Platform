import { useEffect, useState } from "react";

import useAuthRequest from "../hooks/useAuthRequest";
import request from "../utils/request";


const baseUrl = 'http://localhost:3030/data/applications';

export const useAdoptPet = () => {

    const { authRequest } = useAuthRequest();
    const [isLoading, setIsLoading] = useState(false);

    const adopt = (userData, petId) => {
        setIsLoading(true);

        try {
            return authRequest.post(baseUrl, { ...userData, petId });
        } finally {
            setIsLoading(false);
        }
    }

    return {
        adopt,
        isLoading,
    }
};


export const getAll = () => {
    return request.get(baseUrl);
}

export const useUserApplications = (userId) => {

    const [adoptApplications, setAdoptApplications] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`,
            load: 'pet=petId:pets,'
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(result => {
                setAdoptApplications(result);
            })
    }, [userId]);

    return { adoptApplications }
}