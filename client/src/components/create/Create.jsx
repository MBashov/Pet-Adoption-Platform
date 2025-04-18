import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useCreatePet, } from "../../api/petsApi";
import Spinner from "../spinner/Spinner";


export default function CreatePet() {
    const navigate = useNavigate();
    const { create, isLoading } = useCreatePet();
    const [petData, setPetData] = useState({});
    const [imageUrls, setImageUrls] = useState(['']);
    const [errors, setErrors] = useState({});
    
    const createHandler = async (_, formData) => {

        const formValues = Object.fromEntries(formData);
        formValues.imageUrls = imageUrls
            .map(url => url.trim().replace(/^"|"$/g, ''))
            .filter(url => url !== '');

        const validationErrors = validateAll(formValues);
        if (Object.keys(validationErrors).length > 0) {
            toast.warning('Please fix validation errors');
            setPetData(formValues);
            return;
        }

        if (isLoading) {
            return <Spinner />
        }

        try {
            await create(petData);
            navigate('/pets');
            toast.success(`Pet ${petData.name} was successfully created!`);

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

    const handleBlur = (e) => {

        const { name, value } = e.target;

        let message = '';

        if (name === 'name') {
            if (value.length < 3 || value.length > 10) {
                message = 'Name must be between 3 and 10 characters';
            }
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
            newErrors.type = 'Pet type must be one of the following: Dog, Cat, Bird, Rabbit, Hamster, Other';
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

        return newErrors;
    }

    const [_, formAction, isPending] = useActionState(createHandler, { name: '', breed: '', age: '', imageUrl: '', description: '' });

    return (
        <section className="py-12 flex justify-center"
            style={{
                backgroundImage: "url('/images/best3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <form action={formAction} className="max-w-lg md:w-1/2 p-8 shadow-2xl rounded-3xl">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add a New Pet</h1>

                <label htmlFor="name" className="block text-lg font-semibold text-gray-900">Pet Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter pet name..."
                    defaultValue={petData.name}
                    className={`w-full p-2 border ${errors['name'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    onBlur={handleBlur}
                />
                {errors.name && <p className="text-red-900 text-sm mt-1">{errors.name}</p>}

                <label htmlFor="type" className="block text-lg font-semibold text-gray-900 mt-4">Pet Type:</label>
                <select
                    id="type"
                    name="type"
                    className="w-full p-2 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                    defaultValue={petData.type || ''}
                >
                    <option value="" disabled>Select a Pet Type...</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="breed" className="block text-lg font-semibold text-gray-900 mt-4">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    placeholder="Enter pet breed..."
                    defaultValue={petData.breed}
                    className={`w-full p-2 border ${errors['breed'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    onBlur={handleBlur}
                    required
                />
                {errors.breed && <p className="text-red-900 text-sm mt-1">{errors.breed}</p>}

                <label htmlFor="age" className="block text-lg font-semibold text-gray-900 mt-4">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    min="0"
                    placeholder="Enter pet age..."
                    defaultValue={petData.age}
                    className={`w-full p-2 border ${errors['age'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    onBlur={handleBlur}
                    required
                />
                {errors.age && <p className="text-red-900 text-sm mt-1">{errors.age}</p>}

                <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mt-4">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter a short description..."
                    defaultValue={petData.description}
                    className={`w-full p-2 border ${errors['description'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    onBlur={handleBlur}
                    required
                >
                </textarea>
                    {errors.description && <p className="text-red-900 text-sm mt-1">{errors.description}</p>}

                <label className="block text-lg font-semibold text-gray-900 mt-4">Images: add up to 5 images</label>

                {imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 mt-1">
                        <input
                            placeholder="Enter image URL..."
                            type="text"
                            value={url}
                            onChange={(e) => updateImageUrl(index, e.target.value)}
                            className="w-full p-2 border border-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                        {imageUrls.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeImageUrl(index)}
                                className="px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-700">
                                X
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addImageField}
                    className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition">
                    + Add Image
                </button>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition flex justify-center items-center">
                    {isPending ? <span className="mr-2">🚫</span> : 'Create Pet'}
                </button>
            </form>
        </section>
    );
}