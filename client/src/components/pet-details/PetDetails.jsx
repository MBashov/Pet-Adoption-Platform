import { Link, useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useIsOwner } from "../../hooks/useIsOwner";
import { useDeletePet, usePet } from "../../api/petsApi";
import { useCheckIfAdopted } from "../../api/adoptApi";
import Error from "../error/Error";
import useAuthRequest from "../../hooks/useAuthRequest";
import Spinner from "../spinner/Spinner";

export default function PetDetails() {
    const { deletePet } = useDeletePet();
    const { isAuthenticated, userId } = useAuthRequest();
    const { petId } = useParams();
    const { pet, isLoading, error, retryFn } = usePet(petId);
    const { isOwner } = useIsOwner(pet);
    const { isAdopted, isLoading: isPending } = useCheckIfAdopted(userId, petId);

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <Error message={error.message} retry={retryFn} />
    }

    return (
        <section className="py-12 bg-gray-100 flex justify-center relative">
            <div className="max-w-4xl w-full bg-gray-120 shadow-lg rounded-lg p-8 flex relative flex-col md:flex-row">
                {/* Small Images in Top Corner */}
                <div className="absolute top-0 right-0 flex gap-3 p-4">
                    <img src="/images/icon1.png" alt="Small Image 1" className="w-16 h-16 rounded-full" />
                    <img src="/images/icon2.png" alt="Small Image 2" className="w-16 h-16 rounded-full" />
                </div>
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-lg shadow-md">
                    <Swiper
                        navigation
                        pagination={{ clickable: true }}
                        loop={pet.imageUrls?.length > 1}
                        modules={[Navigation, Pagination]}
                        className="h-full"
                    >
                        {pet?.imageUrls &&
                            pet.imageUrls.map((imgSrc, index) => (
                                <SwiperSlide key={index}>
                                    <img src={imgSrc} alt={`${pet.name} ${index + 1}`} className="w-full h-full object-cover" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-gray-100">
                    <h2 className="text-3xl font-bold text-amber-600">{pet.name}</h2>
                    <h6 className="text-lg text-gray-700">
                        <span className="text-amber-600 font-semibold">Pet Type:</span> {pet.type}
                    </h6>
                    <h6 className="text-lg text-gray-700 mt-2">
                        <span className="text-amber-600 font-semibold">Breed:</span> {pet.breed}
                    </h6>
                    <h6 className="text-lg text-gray-700">
                        <span className="text-amber-600 font-semibold">Years:</span> {pet.age}
                    </h6>
                    <p className="text-gray-800 mt-2 text-sm leading-relaxed font-medium tracking-wide text-justify shadow-lg rounded-lg p-2 bg-white">
                        {pet.description}
                    </p>

                    {isAuthenticated && (
                        <div id="all-buttons" className="mt-6 flex gap-4">
                            {isOwner ? (
                                <div id="owner-buttons" className="flex gap-4">
                                    <Link
                                        to={`/pets/${pet._id}/edit`}
                                        className="px-6 py-2 bg-green-500 text-white flex items-center rounded-3xl hover:bg-green-600 transition"
                                    >
                                        Edit Pet
                                    </Link>
                                    <button
                                        onClick={() => deletePet(petId, pet.name)}
                                        className="px-6 py-2 bg-green-500 text-white rounded-3xl hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                isAdopted ? (
                                    <p className="text-blue-500 mt-2 text-sm leading-relaxed font-medium tracking-wide text-justify shadow-lg rounded-lg p-2 bg-white">
                                        Your adoption request for {pet.name} is in progress!
                                    </p>
                                ) : isPending ? (
                                    <Spinner />
                                ) : (
                                    <Link
                                        to={`/pets/${pet._id}/adopt`}
                                        className="px-6 py-2 bg-green-500 text-white rounded-3xl hover:bg-green-600 transition"
                                    >
                                        Adopt Now
                                    </Link>
                                )
                            )}
                        </div>
                    )}
                    <Link to="/pets" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 w-34 transition">Back to Pets</Link>
                </div>
            </div>
        </section>
    );
}