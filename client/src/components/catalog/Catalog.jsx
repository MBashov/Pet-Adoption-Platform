import { useEffect, useState } from "react";

import PetTemplate from "./pet-template/PetTemplate";
import { usePets } from "../../api/petsApi";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import Pagination from "../pagination/Pagination";

export default function Catalog() {

    const [currentPage, setCurrentPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const petsPerPage = 4;

    const { pets, isLoading, error, retryFn } = usePets(currentPage, petsPerPage);

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

            {pets.length > 0 &&
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLastPage={isLastPage}
                />
            }
        </section>
    );
}
