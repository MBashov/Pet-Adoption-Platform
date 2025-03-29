import { useState } from "react";

import useAuthRequest from "../hooks/useAuthRequest";


const baseUrl = 'http://localhost:3030/data/applications';

export const useAdoptPet = () => {

    const { authRequest } = useAuthRequest();
    const [isLoading, setIsLoading] = useState(false);

    const adopt = (userData) => {
        setIsLoading(true);

        try {
            return authRequest.post(baseUrl, userData);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        adopt,
        isLoading,
    }
}