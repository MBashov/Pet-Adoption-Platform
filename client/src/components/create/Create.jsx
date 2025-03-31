import { useActionState, useState } from "react";
import { useNavigate } from "react-router";

import { useCreatePet } from "../../api/petsApi";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";


export default function CreatePet() {
    const navigate = useNavigate();
    const { create, isLoading } = useCreatePet();
    const [petType, setPetType] = useState('');
    const [imageUrls, setImageUrls] = useState(['']);

    const createHandler = async (_, formData) => {

        const petData = Object.fromEntries(formData);
        petData.imageUrls = imageUrls
            .map(url => url.trim().replace(/^"|"$/g, ''))
            .filter(url => url !== '');

        if (isLoading) {
            return <Spinner />
        }

        try {
            await create(petData);
            navigate('/pets');

        } catch (err) {
            <Error message={err.message} />
        }
    }

    const handleChange = (e) => {
        setPetType(e.target.value)
    };

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

    const [_, formAction, isPending] = useActionState(createHandler, { name: '', breed: '', age: '', imageUrl: '', description: '' });

    return (
        <section id="create-pet" className="py-12 bg-gray-200 flex justify-center"> 
            <form action={formAction} className="max-w-lg md:w-1/2 p-8 shadow-2xl rounded-3xl bg-gray-100">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add a New Pet</h1>

                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Pet Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter pet name..."
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label htmlFor="type" className="block text-lg font-semibold text-gray-700 mt-4">Pet Type:</label>
                <select
                    id="type"
                    name="type"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    value={petType}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select a Pet Type...</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="breed" className="block text-lg font-semibold text-gray-700 mt-4">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    placeholder="Enter pet breed..."
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label htmlFor="age" className="block text-lg font-semibold text-gray-700 mt-4">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    min="0"
                    placeholder="Enter pet age..."
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mt-4">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter a short description..."
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                ></textarea>

                <label className="block text-lg font-semibold text-gray-700 mt-4">Images: add up to 5 images</label>

                {imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 mt-1">
                        <input
                            placeholder="Enter image URL..."
                            type="text"
                            value={url}
                            onChange={(e) => updateImageUrl(index, e.target.value)}
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition">
                    {isPending ? 'Creating...' : 'Create Pet'}
                </button>
            </form>
        </section>
    );
}