import { useState } from "react";

export function usePetFormValidations() {

const [errors, setErrors] = useState({});

    const handleBlur = (e) => {

        const { name, value, dataset } = e.target;

        let message = '';

        if (name === 'name') {
            if (value.length < 3 || value.length > 10) {
                message = 'Name must be between 3 and 10 characters';
            }
        }

        if (name === 'type') {
            message = 'Please select a pet type';
        }

        if (name === 'breed') {
            if (value.length < 3 || value.length > 30) {
                message = 'Breed must be between 3 and 30 characters';
            }
        }

        if (name === 'age') {
            if (Number(value) < 0 || !value.trim()) {
                message = 'Age must be a valid non-negative number'
            }
        }

        if (name === 'description') {
            if (value.length < 10) {
                message = 'Description must be at least 10 characters'
            }
        }

        if (name === 'imageUrl') {
            const index = parseInt(dataset.index);
            const newImageUrlErrors = [...(errors.imageUrls || [])];

            if (!value.match(/^https?:\/\//)) {
                newImageUrlErrors[index] = 'Image URL must start with http:// or https://';
            } else {
                newImageUrlErrors[index] = '';
            }

            setErrors((prev) => ({
                ...prev,
                imageUrls: newImageUrlErrors,
            }));

            return;
        }

        if (message) {
            setErrors((prev) => ({ ...prev, [name]: message }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }

    };

    const validateAll = (data) => {
        const newErrors = {};

        if (!data.name || data.name.length < 3 || data.name.length > 10) {
            newErrors.name = 'Name must be between 3 and 10 characters';
        }
        const validTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Other'];
        if (!validTypes.includes(data.type)) {
            newErrors.type = 'Please select a pet type';
        }

        if (!data.breed || data.breed.length < 3 || data.breed.length > 30) {
            newErrors.breed = 'Breed must be between 3 and 30 characters';
        }

        if (!data.age || Number(data.age) < 0 || Number(data.age) > 20) {
            newErrors.age = 'Age must be between 0 and 20 years';
        }

        if (!data.description || data.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        const imageUrlErrors = data.imageUrls.map(url => {
            if (!url.match(/^https?:\/\//)) {
                return 'Invalid image URL';
            }

            return '';
        });

        if (imageUrlErrors.some(msg => msg !== '')) {
            newErrors.imageUrls = imageUrlErrors;
        }

        return newErrors;
    }

    return {
        errors, setErrors, handleBlur, validateAll
    }
}