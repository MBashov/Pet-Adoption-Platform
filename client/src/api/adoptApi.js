import { useEffect, useState } from "react";

import useAuthRequest from "../hooks/useAuthRequest";
import request from "../utils/request";
import { toast } from "react-toastify";


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

export const useCheckIfAdopted = (userId, petId) => {
    const [isAdopted, setIsAdopted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (!userId || !petId) return;

        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}" AND petId="${petId}"`,
        });

        setIsLoading(true);
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(res => setIsAdopted(res.length > 0))
            .catch((err) => toast(err.message))
            .finally(() => setIsLoading(false));


    }, [userId, petId]);

    return { isAdopted, isLoading }
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