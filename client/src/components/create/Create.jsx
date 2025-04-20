import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useCreatePet, } from "../../api/petsApi";
import { usePetFormValidations } from "../../hooks/usePetFormValidation";
import Spinner from "../spinner/Spinner";


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
            setPetData(formValues)
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
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors['name'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.name && <p className="text-red-900 text-sm mt-1">{errors.name}</p>}

                <label htmlFor="type" className="block text-lg font-semibold text-gray-900 mt-4">Pet Type:</label>
                <select
                    id="type"
                    name="type"
                    defaultValue={petData.type || ''}
                    className={`w-full p-2 border ${errors['type'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                    <option value="" disabled>Select a Pet Type...</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Other">Other</option>
                </select>

                {errors.type && <p className="text-red-900 text-sm mt-1">{errors.type}</p>}

                <label htmlFor="breed" className="block text-lg font-semibold text-gray-900 mt-4">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    placeholder="Enter pet breed..."
                    defaultValue={petData.breed}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors['breed'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
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
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors['age'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                />
                {errors.age && <p className="text-red-900 text-sm mt-1">{errors.age}</p>}

                <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mt-4">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter a short description..."
                    defaultValue={petData.description}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors['description'] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                </textarea>
                {errors.description && <p className="text-red-900 text-sm mt-1">{errors.description}</p>}

                <label className="block text-lg font-semibold text-gray-900 mt-4">Images: Add up to 5 images</label>

                {imageUrls.map((url, index) => (
                    <div key={index} className="mt-1">
                        <div className="flex items-center gap-2">
                            <input
                                name="imageUrl"
                                data-index={index}
                                placeholder="Enter image URL..."
                                type="text"
                                value={url}
                                onChange={(e) => updateImageUrl(index, e.target.value)}
                                onBlur={handleBlur}
                                className={`w-full p-2 border ${errors.imageUrls?.[index] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
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
                        {errors.imageUrls?.[index] && <p className="text-red-900 text-sm mt-1">{errors.imageUrls[index]}</p>}
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