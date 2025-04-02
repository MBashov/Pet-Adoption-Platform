import { useUserPets } from "../../api/petsApi";
import { useUserContext } from "../../contexts/UserContext";
import PetTemplate from "../catalog/pet-template/PetTemplate";
import Spinner from "../spinner/Spinner";
import useAuthRequest from "../../hooks/useAuthRequest";
import { useUserApplications } from "../../api/adoptApi";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";

export default function Profile() {
    const { userId } = useAuthRequest();
    const { email } = useUserContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const petsPerPage = 4;


    const { pets, isLoading } = useUserPets(currentPage, petsPerPage); //TODO Add Eror same as catalog
    const { adoptApplications } = useUserApplications(userId);
    useEffect(() => {
        setIsLastPage(pets.length < petsPerPage);
    }, [pets]);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col flex-grow items-center p-6">

            {/* Profile Hero Section */}
            <section className="profile-hero w-full bg-white shadow-lg p-6 mb-6">
                <div className="w-full flex flex-col items-center justify-center text-center mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
                    <p className="text-blue-400">
                        <strong className="ml-5"> Welcome back, {email}</strong>
                    </p>
                </div>
            </section>

            <section className="created-pets w-full bg-white flex-grow shadow-lg p-6 mb-6">
                <div className="container">
                    <h3 className="text-3xl mb-2 font-bold text-gray-800">Your Added Pets</h3>
                    <div className="flex flex-wrap left gap-8">
                        {pets.length > 0
                            ? pets.map(pet => (
                                <PetTemplate key={pet._id} pet={pet} />
                            ))
                            : <p className="text-xl text-blue-500 font-semibold pt-20">You haven&#39;t added any pets yet</p>
                        }
                    </div>
                </div>
                
                {pets.length > 0 &&
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        isLastPage={isLastPage}
                    />
                }
            </section>

            <section className="applied-pets w-full bg-white flex-grow shadow-lg p-6 mb-6">
                <div className="container">
                    <h3 className="text-3xl mb-2 font-bold text-gray-800">You have applied to adopt the following pets</h3>
                    <div className="flex flex-wrap left gap-8">
                        {adoptApplications.length > 0
                            ? adoptApplications.map(application => (
                                <PetTemplate key={application._id} pet={application.pet} />
                            ))
                            : <p className="text-xl text-blue-500 font-semibold pt-20">You haven&#39;t applied to adopt any pets yet</p>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}
