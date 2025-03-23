import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { useLatestPets } from '../../api/petsApi';
import PetTemplate from '../catalog/pet-template/PetTemplate';

export default function Home() {

    const { pets } = useLatestPets();
    //TODO: Add error handling (if fetching is failed)s
    
    return (
        <section className="relative bg-gray-100">
            {/* Sliding Section */}
            <div className="block mx-auto py-0.7 h-[775px] max-w-7xl">
                <div className="block mx-auto py-10 max-w-7xl">
                    <Swiper
                        navigation
                        modules={[Navigation, Autoplay]}
                        loop
                        speed={1000}
                        autoplay={{
                            delay: 3000, // Adjust time in milliseconds (3 seconds)
                            disableOnInteraction: false // Keeps autoplay even after user interaction
                        }}
                        className="rounded-lg shadow-lg overflow-hidden"
                    >
                        {/* Slide 1 */}
                        <SwiperSlide>
                            <div className="flex w-full h-[700px]">
                                <div className="w-2/2">
                                    <img src="/images/slide1.jpg" alt="Slide 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-1/3 bg-gray-900 text-white flex flex-col justify-center px-10">
                                    <h2 className="text-3xl font-bold">
                                        They Need Your <span className="text-orange-400">Love</span> and <span className="text-green-400">Care</span>
                                    </h2>
                                    <p className="text-lg text-gray-300 mt-3">It is so easy to make them happy</p>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 2 */}
                        <SwiperSlide>
                            <div className="flex w-full h-[700px]">
                                <div className="w-2/2">
                                    <img src="/images/slide2.jpg" alt="Slide 2" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-1/3 bg-gray-900 text-white flex flex-col justify-center px-10">
                                    <h2 className="text-3xl font-bold">Join Us <span className="text-orange-400">Today!</span></h2>
                                    <p className="text-lg text-gray-300 mt-2"><span className="text-green-400">Help us make a difference.</span> </p>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 3 */}
                        <SwiperSlide>
                            <div className="flex w-full h-[700px]">
                                <div className="w-2/2">
                                    <img src="/images/slide3.jpg" alt="Slide 3" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-1/3 bg-gray-900 text-white flex flex-col justify-center px-10">
                                    <h2 className="text-3xl font-bold">Every Life Matters</h2>
                                    <p className="text-lg text-gray-300 mt-2">Give them love and care.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className="py-12 bg-gray-200">
                <h1 className="text-3xl text-center mb-8 font-serif font-bold text-gray-800">New Arrivals: <span className="text-blue-500">Ready to Adopt Pets</span></h1>

                <div className="flex justify-center gap-8">

                    {pets.length > 0
                        ? pets.map(pet => <PetTemplate key={pet._id} pet={pet} />)
                        : <p className="no-articles text-center text-3xl text-center mb-8 font-serif font-bold text-blue-500">No pets available for adoption yet</p>
                    }

                </div>


            </div>
        </section>
    );
}