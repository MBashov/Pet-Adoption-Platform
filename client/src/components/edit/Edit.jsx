import { useActionState, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useEditPet, usePet } from "../../api/petsApi";
import { usePetFormValidations } from "../../hooks/usePetFormValidation";

import useAuthRequest from "../../hooks/useAuthRequest";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import NotFound from "../404/404";
import PetForm from "../pet-form/PetForm";

export default function EditPet() {

    const navigate = useNavigate();
    const { petId } = useParams();
    const { pet, isLoading, error, retryFn } = usePet(petId);
    const { edit, loading } = useEditPet();
    const [isOwner, setIsOwner] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const { userId } = useAuthRequest();
    const { errors, setErrors, handleBlur, validateAll } = usePetFormValidations();


    useEffect(() => {
        if (pet) {
            setImageUrls(pet.imageUrls);
            setIsOwner(userId === pet._ownerId);
        }
    }, [pet, userId]);

    const editHandler = async (_, formData) => {
        const petData = Object.fromEntries(formData);

        petData.imageUrls = imageUrls
            .map(url => url.trim().replace(/^"|"$/g, ''))
            .filter(url => url !== '');

        const validationErrors = validateAll(petData);

        if (Object.keys(validationErrors).length > 0) {
            toast.warning('Please fix validation errors');
            setErrors(validationErrors);
            return;
        }

        try {
            await edit(petData, petId);
            navigate(`/pets/${petId}/details`);
            toast.success(`Pet ${pet.name} was successfully edited!`);
        } catch (err) {
            toast.error(err.message);
        }
    }

    const [_, formAction, isPending] = useActionState(editHandler, {
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        imageUrls: pet.imageUrls,
        description: pet.description
    });

    if (isLoading) {
        return <Spinner />
    }

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <Error message={error.message} retry={retryFn} />
    }

    if (!isOwner) {
        return <NotFound />;
    }

    const addImageField = () => {
        if (imageUrls.length >= 5) return;
        setImageUrls(prev => [...prev, '']);

    };

    const updateImageUrl = (index, value) => {
        const updatedUrls = [...imageUrls];
        updatedUrls[index] = value;
        setImageUrls(updatedUrls);
    };

    const removeImageUrl = (index) => {
        if (imageUrls.length === 1) return;
        setImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <PetForm
            title="Edit Pet"
            formAction={formAction}
            isPending={isPending}
            pet={pet}
            errors={errors}
            handleBlur={handleBlur}
            imageUrls={imageUrls}
            updateImageUrl={updateImageUrl}
            removeImageUrl={removeImageUrl}
            addImageField={addImageField}
        />
    );
}