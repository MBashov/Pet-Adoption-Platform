
import PetTemplate from "./pet-template/PetTemplate";
import { usePets } from "../../api/petsApi";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";

export default function Catalog() {

    const { pets, isLoading, error } = usePets();
   
    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <Error />
    }

    return (
        <section className="py-12 bg-blue-50 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">All Available Pets for Adoption</h1>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {pets.length > 0
                    ? pets.map((pet) => (
                        <PetTemplate key={pet._id} pet={pet} />
                    ))
                    : <p className="text-xl text-blue-500 font-semibold pt-20">No pets available for adoption yet...</p>
                }
            </div>
        </section>

    );
}
