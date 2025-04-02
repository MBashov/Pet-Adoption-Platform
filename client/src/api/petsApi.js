import { useCallback, useEffect, useRef, useState } from "react";

import request from "../utils/request";
import useAuthRequest from "../hooks/useAuthRequest";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const baseUrl = 'http://localhost:3030/data/pets';

export const usePets = (currentPage, petsPerPage) => {

    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const skip = (currentPage - 1) * petsPerPage;

    const fetchPets = useCallback(() => {

        const controller = new AbortController();

        const searchParams = new URLSearchParams({
            offset: skip,
            pageSize: petsPerPage,
            select: '_id,imageUrls,name,breed,age',
        });

        setIsLoading(true);
        setError(null);

        request
            .get(`${baseUrl}?${searchParams.toString()}`, null, { signal: controller.signal })
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
    }, [skip, petsPerPage])

    useEffect(() => {
        fetchPets()
    }, [fetchPets]);
    return { pets, isLoading, error, retryFn: fetchPets }
};

export const useLatestPets = () => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPets = () => {

        const controller = new AbortController();

        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,imageUrls,name,breed,age',
        });

        setIsLoading(true);
        setError(null);

        request
            .get(`${baseUrl}?${searchParams.toString()}`, null, { signal: controller.signal })
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
    }

    useEffect(() => {
        fetchPets();
    }, []);

    return { pets, isLoading, error, retryFn: fetchPets }
};

export const usePet = (petId) => {
    const [pet, setPet] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const ref = useRef(null);

    const fetchPet = useCallback(() => {
        if (!petId) return;

        const controller = new AbortController();
        setIsLoading(true);
        setError(null);

        request
            .get(`${baseUrl}/${petId}`, null, { signal: controller.signal })
            .then((result) => setPet(result))
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            })
            .finally(() => setIsLoading(false));

        return () => controller.abort();
    }, [petId]);

    useEffect(() => {
        ref.current = fetchPet;
        fetchPet();
    }, [fetchPet]);

    return { pet, isLoading, error, retryFn: ref.current };
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
    const navigate = useNavigate();

    const deletePet = async (petId) => {

        try {
            await authRequest.delete(`${baseUrl}/${petId}`);
            navigate('/pets');
            toast.success(`Pet was successfully deleted!`);

        } catch (err) {
            toast.error(err.message);
        }
    }

    return {
        deletePet,
    }
}

export const useUserPets = (currentPage, petsPerPage) => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useAuthRequest();

    const skip = (currentPage - 1) * petsPerPage;

    useEffect(() => {

        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            where: `_ownerId="${userId}"`,
            pageSize: petsPerPage,
            offset: skip,
        });

        setIsLoading(true);
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then((result) => {
                setPets(result);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(setIsLoading(false));
    }, [userId, petsPerPage,skip]);

    return { pets, isLoading, error }
}