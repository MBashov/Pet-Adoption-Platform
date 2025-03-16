import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function Home() {
    return (
        <section className="relative bg-gray-100">
            {/* Sliding Section */}
            <div className="block mx-auto py-10 h-[775px] max-w-7xl"> 
                <Swiper
                    navigation
                    modules={[Navigation]}
                    loop
                    className="blockd rounded-lg shadow-lg overflow-hidden"
                >
                    <SwiperSlide className="relative">
                        <img src="/images/slide1.jpg" alt="Slide 1" className="w-full h-[700px] object-cover" /> 
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                            <h2 className="text-3xl font-bold">They Need Your <span className="text-yellow-400">Love</span> and <i>Care</i></h2>
                            <p className="text-lg">It is so easy to make them happy</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="relative">
                    <img src="/images/slide2.jpg" alt="Slide 1" className="w-full h-[700px] object-cover" /> 
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                            <h2 className="text-3xl font-bold">They Need Your <span className="text-yellow-400">Love</span> and <i>Care</i></h2>
                            <p className="text-lg">It is so easy to make them happy</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="relative">
                    <img src="/images/slide3.jpg" alt="Slide 1" className="w-full h-[700px] object-cover" /> 
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                            <h2 className="text-3xl font-bold">They Need Your <span className="text-yellow-400">Love</span> and <i>Care</i></h2>
                            <p className="text-lg">It is so easy to make them happy</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>



            {/* Latest Pets Section */}
            <div id="home-page" className="py-12 bg-white">
                <h1 className="text-3xl font-bold text-center mb-8">Latest Adoptable Pets</h1>

                {/* Container for the pets */}
                <div className="flex justify-center gap-8">

                    {/* Display pet 1 */}
                    <div className="pet flex flex-col items-center mb-8">
                        <div className="image-wrap w-64 h-64 overflow-hidden rounded-lg shadow-lg mb-4">
                            <img src="/images/carousel1_img3.jpg" alt="Pet 1" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Buddy</h3>
                        <div className="info text-gray-700 mb-4">
                            <p>Breed: Labrador Retriever</p>
                            <p>Age: 2 Years</p>
                        </div>
                        <div className="data-buttons">
                            <Link to="/pet-details/1" className="btn details-btn px-6 py-2 bg-blue-500 text-white rounded-full">
                                View Details
                            </Link>
                        </div>
                    </div>

                    {/* Display pet 2 */}
                    <div className="pet flex flex-col items-center mb-8">
                        <div className="image-wrap w-64 h-64 overflow-hidden rounded-lg shadow-lg mb-4">
                            <img src="/images/carousel1_img4.jpg" alt="Pet 2" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Whiskers</h3>
                        <div className="info text-gray-700 mb-4">
                            <p>Breed: Persian</p>
                            <p>Age: 3 Years</p>
                        </div>
                        <div className="data-buttons">
                            <Link to="/pet-details/2" className="btn details-btn px-6 py-2 bg-blue-500 text-white rounded-full">
                                View Details
                            </Link>
                        </div>
                    </div>

                    {/* Display pet 3 */}
                    <div className="pet flex flex-col items-center mb-8">
                        <div className="image-wrap w-64 h-64 overflow-hidden rounded-lg shadow-lg mb-4">
                            <img src="/images/carousel1_img5.jpg" alt="Pet 3" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Fluffy</h3>
                        <div className="info text-gray-700 mb-4">
                            <p>Breed: Dutch Rabbit</p>
                            <p>Age: 1 Year</p>
                        </div>
                        <div className="data-buttons">
                            <Link to="/pet-details/3" className="btn details-btn px-6 py-2 bg-blue-500 text-white rounded-full">
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Display message if no pets are available */}
                <p className="no-articles text-center text-gray-500">No pets available for adoption yet</p>
            </div>
        </section>
    );
}
