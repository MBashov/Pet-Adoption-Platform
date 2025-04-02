import { useEffect, useState } from "react";

import PetTemplate from "./pet-template/PetTemplate";
import { usePets } from "../../api/petsApi";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";

export default function Catalog() {

    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 4;

    const { pets, isLoading, error, retryFn } = usePets(currentPage, petsPerPage);

    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        setIsLastPage(pets.length < petsPerPage);
    }, [pets]);

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <Error message={error.message} retry={retryFn} />
    }


    return (
        <section className="py-12 bg-grey-100 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Pets for Adoption</h1>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {pets.length > 0
                    ? pets.map((pet) => (
                        <PetTemplate key={pet._id} pet={pet} />
                    ))
                    : <p className="text-xl text-blue-500 font-semibold pt-20">No pets available for adoption yet...</p>
                }
            </div>

            <div className="mt-35 flex justify-center items-center gap-4 mt-8">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-24 h-10 flex justify-center items-center bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="px-6 py-2 bg-blue-500 text-white rounded-3xl">
                    {currentPage}
                </span>

                <button
                    disabled={isLastPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-24 h-10 flex justify-center items-center bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
    );
}
