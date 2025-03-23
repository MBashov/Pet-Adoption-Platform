import { Link, useNavigate, useParams } from "react-router";

import { useDeletePet, usePet, } from "../../api/petsApi";

export default function PetDetails() {
    const navigate = useNavigate();
    const { petId } = useParams();
    const { del } = useDeletePet();
    const { pet } = usePet(petId);

    const petDeleteHandler = async () => {

        const confirm = window.confirm('Are you sure you want to delete this pet?');

        if (!confirm) {
            return;
        }

        await del(petId);

        navigate('/pets')
    }


    //TODO: ADd more pet details
    return (
        <section className="py-12 bg-gray-100 flex justify-center">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-lg shadow-md">
                    <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800">{pet.name}</h2>
                    <h6 className="text-lg text-gray-600 mt-2">Breed: {pet.breed}</h6>
                    <h6 className="text-lg text-gray-600">Age: {pet.age} Years</h6>
                    <p className="text-gray-700 mt-4">{pet.description}</p>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <Link to="/pets" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition">Back to Pets</Link>
                        <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded-3xl hover:bg-green-600 transition">Adopt Now</button>
                        <Link to={`/pets/${pet._id}/edit`} className="mt-6 px-6 py-2 bg-green-500 text-white flex items-center rounded-3xl hover:bg-green-600 transition">Edit Pet</Link>
                        <button onClick={petDeleteHandler} className="mt-6 px-6 py-2 bg-green-500 text-white rounded-3xl hover:bg-red-600 transition">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    );
}