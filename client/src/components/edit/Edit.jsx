import { useActionState, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { useEditPet, usePet } from "../../api/petsApi";
import useAuthRequest from "../../hooks/useAuthRequest";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import NotFound from "../404/404";
import { toast } from "react-toastify";

export default function EditPet() {

    const navigate = useNavigate();
    const { petId } = useParams();
    const { pet, isLoading, error, retryFn } = usePet(petId);
    const { edit, loading } = useEditPet();
    const [isOwner, setIsOwner] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const { userId } = useAuthRequest();


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

        if (loading) {
            return <Spinner />
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
        breed: pet.breed,
        age: pet.age,
        imageUrls: pet.imageUrls,
        description: pet.description
    });

    if (isLoading) {
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
        <section id="edit-pet" className="py-12 bg-gray-200 flex justify-center">
            <form action={formAction} className="max-w-lg md:w-1/2 p-8 shadow-2xl rounded-3xl bg-gray-100">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Pet</h1>

                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Pet Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter pet name..."
                    defaultValue={pet.name}
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label htmlFor="type" className="block text-lg font-semibold text-gray-700 mt-4">Pet Type:</label>
                <select
                    id="type"
                    name="type"
                    defaultValue={pet.type}
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
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
                    defaultValue={pet.breed}
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
                    defaultValue={pet.age}
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mt-4">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter a short description..."
                    defaultValue={pet.description}
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
                    {isPending ? "Editing..." : "Edit Pet"}
                </button>
            </form>
        </section>
    );
}