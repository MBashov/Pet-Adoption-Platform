import { Link, useNavigate, useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useIsOwner } from "../../hooks/useIsOwner";
import { useDeletePet, usePet, } from "../../api/petsApi";
import Error from "../error/Error";
import useAuthRequest from "../../hooks/useAuthRequest";
import { getAll } from "../../api/adoptApi";
import { useEffect, useState } from "react";

export default function PetDetails() {
    const navigate = useNavigate();
    const { del } = useDeletePet();
    const { isAuthenticated, userId } = useAuthRequest();
    const { petId } = useParams();
    const { pet } = usePet(petId);
    const { isOwner } = useIsOwner(pet);
    const [hasAdopted, setHasAdopted] = useState([]);

    useEffect(() => {

        const adoptHandler = async () => {
            const allAplicants = await getAll();
            const filtered = allAplicants.filter(app => app._ownerId === userId && app.petId === petId);

            setHasAdopted(filtered.length > 0);
        }

        if (userId && petId) {
            adoptHandler();
        }

    }, [petId, userId]);


    const petDeleteHandler = async () => {

        const confirm = window.confirm('Are you sure you want to delete this pet?');

        if (!confirm) {
            return;
        }
        try {
            await del(petId);
        } catch (err) {
            <Error message={err.message} />
        }

        navigate('/pets')
    }

    return (
        <section className="py-12 bg-gray-100 flex justify-center relative">
            <div className="max-w-4xl w-full bg-gray-120 shadow-lg rounded-lg p-8 flex relative flex-col md:flex-row">
                {/* Small Images in Top Corner */}
                <div className="absolute top-0 right-0 flex gap-3 p-4">
                    <img src="/images/icon1.png" alt="Small Image 1" className="w-16 h-16 rounded-full shadow-lg" />
                    <img src="/images/icon2.png" alt="Small Image 2" className="w-16 h-16 rounded-full shadow-lg" />
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
                        {pet.imageUrls?.length > 0 ? (
                            pet.imageUrls.map((imgSrc, index) => (
                                <SwiperSlide key={index}>
                                    <img src={imgSrc} alt={`${pet.name} ${index + 1}`} className="w-full h-full object-cover" />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <img src={pet.imageUrls} alt={pet.name} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        )}
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
                                        onClick={petDeleteHandler}
                                        className="px-6 py-2 bg-green-500 text-white rounded-3xl hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                hasAdopted ? (
                                    <p className="text-blue-500 mt-2 text-sm leading-relaxed font-medium tracking-wide text-justify shadow-lg rounded-lg p-2 bg-white">
                                        Your adoption request for {pet.name} is in progress!
                                    </p>
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