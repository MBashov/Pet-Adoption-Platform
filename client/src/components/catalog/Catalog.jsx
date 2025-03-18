export default function Catalog() {
    const pets = [
        {
            id: 1,
            name: "Buddy",
            breed: "Labrador Retriever",
            age: "2 Years",
            image: "/images/carousel1_img3.jpg"
        },
        {
            id: 2,
            name: "Whiskers",
            breed: "Persian Cat",
            age: "3 Years",
            image: "/images/carousel1_img4.jpg"
        },
        {
            id: 3,
            name: "Max",
            breed: "Golden Retriever",
            age: "1.5 Years",
            image: "/images/carousel1_img5.jpg"
        },
        {
            id: 4,
            name: "Luna",
            breed: "Siberian Husky",
            age: "2.5 Years",
            image: "/images/carousel1_img6.jpg"
        },
        {
            id: 5,
            name: "Max",
            breed: "Golden Retriever",
            age: "1.5 Years",
            image: "/images/carousel1_img5.jpg"
        },
        {
            id: 6,
            name: "Max",
            breed: "Golden Retriever",
            age: "1.5 Years",
            image: "/images/carousel1_img5.jpg"
        },
        {
            id: 7,
            name: "Max",
            breed: "Golden Retriever",
            age: "1.5 Years",
            image: "/images/carousel1_img5.jpg"
        },
    ];

    return (
        <section className="py-12 bg-gray-100 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">All Available Pets for Adoption</h1>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <div key={pet.id} className="w-80 h-auto p-6 shadow-lg rounded-lg bg-white text-center">
                            <div className="w-full h-64 overflow-hidden rounded-lg shadow-md">
                                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-2xl font-bold mt-4">{pet.name}</h3>
                            <div className="text-gray-700 my-3">
                                <p>Breed: {pet.breed}</p>
                                <p>Age: {pet.age}</p>
                            </div>
                            <div className="mt-4">
                                <a href={`/pet-details/${pet.id}`} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                                    View Details
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-3xl text-blue-500 font-bold text-center">No pets available for adoption yet...</p>
                )}
            </div>
        </section>
    );
}
