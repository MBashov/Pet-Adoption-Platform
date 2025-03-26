import { useActionState } from "react";
import { useParams, useNavigate, Navigate } from "react-router";
import { useEditPet, usePet } from "../../api/petsApi";
import { useIsOwner } from "../../hooks/useIsOwner";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

export default function EditPet() {

    const navigate = useNavigate();
    const { petId } = useParams();
    const { pet, isLoading } = usePet(petId);
    const { edit, loading } = useEditPet();
    const { isOwner } = useIsOwner(pet);


    if (isLoading) {
       <Spinner />
    }

    // if (!isOwner) {
    //     return <Navigate to={'/pets'} /> //TODO Show appropriate message Fix edit - currently avaliable for not Owners
    // }

    const editHandler = async (_, formData) => {
        const petData = Object.fromEntries(formData);
        
        if (loading) {
            return <Spinner />
        }

        try {
            await edit(petData, petId);
            navigate('/pets');
        } catch (err) {
            <Error message={err.message} />            
        }
    }

    const [_, formAction, isPending] = useActionState(editHandler, {
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        imageUrl: pet.imageUrl,
        description: pet.description
    });

    return (
        <section id="edit-pet" className="py-12 bg-gray-200 flex justify-center">
            <form action={formAction} className="w-96 p-6 shadow-lg rounded-lg bg-gray-100">
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

                <label htmlFor="imageUrl" className="block text-lg font-semibold text-gray-700 mt-4">Image URL:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Enter image URL..."
                    defaultValue={pet.imageUrl}
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
//TODO: Show red block sign on edit button while fetching