import { useUserPets } from "../../api/petsApi";
import { useUserContext } from "../../contexts/UserContext";
import PetTemplate from "../catalog/pet-template/PetTemplate";
import Spinner from "../spinner/Spinner";
import useAuthRequest from "../../hooks/useAuthRequest";
import { useUserApplications } from "../../api/adoptApi";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import Error from "../error/Error";

export default function Profile() {
    const { userId } = useAuthRequest();
    const { email } = useUserContext();

    const [currentPagePets, setCurrentPagePets] = useState(1);
    const [isLastPagePets, setIsLastPagePets] = useState(false);
    const [currentPageAppl, setCurrentPageAppl] = useState(1);
    const [isLastPageAppl, setIsLastPageAppl] = useState(false);
    const petsPerPage = 4;


    const { pets, isLoading: isLoadingPets, error: errorPets, retryFn: retryFnPets } = useUserPets(currentPagePets, petsPerPage);
    const { adoptApplications, isLoadingAppl, errorAppl, retryFnAppl } = useUserApplications(userId, currentPageAppl, petsPerPage);

    useEffect(() => {
        if (pets) {
            setIsLastPagePets(pets.length < petsPerPage);
        }
    }, [pets]);

    useEffect(() => {
        if (adoptApplications) {
            setIsLastPageAppl(adoptApplications.length < petsPerPage);
        }
    }, [adoptApplications]);


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col flex-grow items-center p-6">

            {/* Profile Hero Section */}
            <section className="profile-hero w-full bg-white shadow-lg p-6 mb-6">
                <div className="w-full flex flex-col items-center justify-center text-center mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
                    <p className="text-blue-500">
                        <strong className="ml-5"> Welcome back, {email}</strong>
                    </p>
                </div>
            </section>

            <section className="created-pets w-full bg-white flex-grow shadow-lg p-6 mb-6">
                <div className="container">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-blue-500">Pets You&#39;ve Added</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {errorPets ? (
                            <Error message={errorPets.message} retry={retryFnPets} />
                        ) : isLoadingPets ? (
                            <Spinner />
                        ) : pets.length > 0 ? (
                            pets.map(pet => (
                                <PetTemplate key={pet._id} pet={pet} />
                            ))
                        ) : (
                            <p className="w-full text-xl text-blue-500 font-semibold pt-20 text-center">You haven&#39;t added any pets yet</p>
                        )}
                    </div>
                </div>

                {pets.length > 0 &&
                    <Pagination
                        currentPage={currentPagePets}
                        setCurrentPage={setCurrentPagePets}
                        isLastPage={isLastPagePets}
                    />
                }
            </section>

            <section className="applied-pets w-full bg-white flex-grow shadow-lg p-6 mb-6">
                <div className="container">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-blue-500">You&#39;ve shown interest in adopting {adoptApplications.length === 1 ? 'this pet' : 'these pets'}</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div >
                        </div>
                        {errorAppl ? (
                            <Error message={errorAppl.message} retry={retryFnAppl} />
                        ) : isLoadingAppl ? (
                            <Spinner />
                        ) : adoptApplications.length > 0 ? (
                            adoptApplications.map(application => (
                                <PetTemplate key={application._id} pet={application.pet} />
                            ))
                        ) : (
                            <p className="w-full text-xl text-blue-500 font-semibold pt-20 text-center">You haven&#39;t applied to adopt any pets yet</p>
                        )}
                    </div>
                </div>

                {adoptApplications.length > 0 &&
                    <Pagination
                        currentPage={currentPageAppl}
                        setCurrentPage={setCurrentPageAppl}
                        isLastPage={isLastPageAppl}
                    />
                }
            </section>
        </div>
    );
}
