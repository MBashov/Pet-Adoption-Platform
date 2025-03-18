import PetTemplate from "./pet-template/PetTemplate";

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
                    pets.map((pet) => <PetTemplate key={pet.id} pet={pet}/>)
                ) : (
                    <p className="text-3xl text-blue-500 font-bold pt-20 ">No pets available for adoption yet...</p>
                )}
            </div>
        </section>
    );
}
