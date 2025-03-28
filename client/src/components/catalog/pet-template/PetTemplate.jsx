import PropTypes from "prop-types"
import { Link } from "react-router";

export default function PetTemplate({ pet }) {
    
    return (
        <div className="w-80 h-auto p-6 shadow-lg rounded-lg bg-white text-center">
            <div className="w-full h-64 overflow-hidden rounded-lg shadow-md">
                <img src={pet.imageUrls[0]} alt={pet.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold mt-4">{pet.name}</h3>
            <div className="text-gray-700 my-3">
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age}</p>
            </div>
            <div className="mt-4">
                <Link to={`/pets/${pet._id}/details`} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                    View Details
                </Link>
            </div>
        </div>
    );
}

PetTemplate.propTypes = {
    pet: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        imageUrls: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        breed: PropTypes.string.isRequired,
        age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};