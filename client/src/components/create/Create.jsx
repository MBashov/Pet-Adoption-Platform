import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useCreatePet, } from "../../api/petsApi";
import { usePetFormValidations } from "../../hooks/usePetFormValidation";
import Spinner from "../spinner/Spinner";
import PetForm from "../pet-form/PetForm";


export default function CreatePet() {
    const navigate = useNavigate();
    const { create, isLoading } = useCreatePet();
    const [petData, setPetData] = useState({});
    const [imageUrls, setImageUrls] = useState(['']);
    const { errors, setErrors, handleBlur, validateAll } = usePetFormValidations();

    const createHandler = async (_, formData) => {

        const formValues = Object.fromEntries(formData);
        formValues.imageUrls = imageUrls
            .map(url => url.trim().replace(/^"|"$/g, ''))
            .filter(url => url !== '');

        const validationErrors = validateAll(formValues);

        if (Object.keys(validationErrors).length > 0) {
            toast.warning('Please fix validation errors');
            setPetData(formValues);
            setErrors(validationErrors);
            return;
        }

        try {
            await create(formValues);
            navigate('/pets');

            toast.success(`Pet ${formValues.name} was successfully created!`);

        } catch (err) {
            toast.error(err.message);
        }
    }

    const addImageField = () => {
        if (imageUrls.length >= 5) return;
        setImageUrls(prev => [...prev, ""]);
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

    const [_, formAction, isPending] = useActionState(createHandler, { name: '', breed: '', age: '', description: '' });

    if (isLoading) {
        return <Spinner />
    }

    return (

        <PetForm
            title="Add a New Pet"
            formAction={formAction}
            isPending={isPending}
            pet={petData} 
            errors={errors}
            handleBlur={handleBlur}
            imageUrls={imageUrls}
            updateImageUrl={updateImageUrl}
            removeImageUrl={removeImageUrl}
            addImageField={addImageField}
        />
    );
}