export default function CreatePet() {

    return (
        <section id="create-pet" className="py-12 bg-gray-200 flex justify-center">
            <form className="w-96 p-6 shadow-lg rounded-lg bg-gray-100">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add a New Pet</h1>
                
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Pet Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter pet name..." 
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    required 
                />
                
                <label htmlFor="breed" className="block text-lg font-semibold text-gray-700 mt-4">Breed:</label>
                <input 
                    type="text" 
                    id="breed" 
                    name="breed" 
                    placeholder="Enter pet breed..." 
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    required 
                />
                
                <label htmlFor="age" className="block text-lg font-semibold text-gray-700 mt-4">Age:</label>
                <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    min="0" 
                    placeholder="Enter pet age..." 
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    required 
                />
                
                <label htmlFor="imageUrl" className="block text-lg font-semibold text-gray-700 mt-4">Image URL:</label>
                <input 
                    type="text" 
                    id="imageUrl" 
                    name="imageUrl" 
                    placeholder="Enter image URL..." 
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    required 
                />
                
                <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mt-4">Description:</label>
                <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Enter a short description..." 
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    required
                ></textarea>
                
                <button 
                    type="submit" 
                    className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition">
                    Create Pet
                </button>
            </form>
        </section>
    );
}