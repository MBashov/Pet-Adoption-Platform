import { useState } from "react";

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