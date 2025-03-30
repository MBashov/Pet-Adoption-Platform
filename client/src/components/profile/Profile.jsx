import { useUserPets } from "../../api/petsApi";
import { useUserContext } from "../../contexts/UserContext";
import PetTemplate from "../catalog/pet-template/PetTemplate";
import Spinner from "../spinner/Spinner";

export default function Profile() {
    const { email } = useUserContext();
    const { pets, isLoading } = useUserPets();

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

            {/* Profile Hero Section */}
            <section className="profile-hero w-full bg-white shadow-lg p-6 mb-6">
                <div className="container flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
                    <p className="text-gray-600">
                        Welcome back,<strong className="ml-2">{email}</strong>
                    </p>
                </div>
            </section>

            {/* Created Pets Section */}
            <section className="created-pets w-full bg-white shadow-lg p-6 mb-6">
                <div className="container">
                    <h3 className="text-3xl mb-2 font-bold text-gray-800">Added Pets</h3>
                    <div className="flex flex-wrap left gap-8">
                        {pets.length > 0
                            ? pets.map(pet => (
                                <PetTemplate key={pet._id} pet={pet} />
                            ))
                            : <p className="text-xl text-blue-500 font-semibold pt-20">You haven&#39;t added any pets yet</p>
                        }
                    </div>
                </div>
            </section>

            {/* Preferred Pets Section */}
            <section className="preferred-pets w-full bg-white shadow-lg p-6 mb-6">
                <div className="container">
                    <h3 className="text-3xl mb-2 font-bold text-gray-800">You applied to adopt the following pets</h3>
                    <div className="flex flex-wrap left gap-8">
                        {/* {userApplications.length > 0
                            ? userApplications.map(pet => (
                                <PetTemplate key={pet._id} pet={pet} />
                            ))
                            : <p className="text-xl text-blue-500 font-semibold pt-20">You haven&#39;t applied to adopt any pets yet</p>
                        } */}
                    </div>
                </div>
            </section>
        </div>
    );
}
