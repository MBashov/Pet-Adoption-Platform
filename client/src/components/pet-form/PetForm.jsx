import PropTypes from "prop-types"

export default function PetForm({
    title,
    formAction,
    isPending,
    pet,
    errors,
    handleBlur,
    imageUrls,
    updateImageUrl,
    removeImageUrl,
    addImageField
}) {

    return (
        <section className="py-12 flex justify-center"
            style={{
                backgroundImage: "url('/images/best3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <form action={formAction} className="max-w-lg md:w-1/2 p-8 shadow-2xl rounded-3xl">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">{title}</h1>

                <label htmlFor="name" className="block text-lg font-semibold text-gray-900">Pet Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter pet name..."
                    defaultValue={pet.name}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm`}
                />
                {errors.name && <p className="text-red-900 text-sm mt-1">{errors.name}</p>}

                <label htmlFor="type" className="block text-lg font-semibold text-gray-900 mt-4">Pet Type:</label>
                <select
                    id="type"
                    name="type"
                    defaultValue={pet.type || ""}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors.type ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm`}
                >
                    <option value="" disabled>Select a Pet Type...</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Other">Other</option>
                </select>
                {errors.type && <p className="text-red-900 text-sm mt-1">{errors.type}</p>}

                <label htmlFor="breed" className="block text-lg font-semibold text-gray-900 mt-4">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    placeholder="Enter pet breed..."
                    defaultValue={pet.breed}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors.breed ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm`}
                />
                {errors.breed && <p className="text-red-900 text-sm mt-1">{errors.breed}</p>}

                <label htmlFor="age" className="block text-lg font-semibold text-gray-900 mt-4">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter pet age..."
                    defaultValue={pet.age}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors.age ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm`}
                />
                {errors.age && <p className="text-red-900 text-sm mt-1">{errors.age}</p>}

                <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mt-4">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter a short description..."
                    defaultValue={pet.description}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm`}
                ></textarea>
                {errors.description && <p className="text-red-900 text-sm mt-1">{errors.description}</p>}

                <label className="block text-lg font-semibold text-gray-900 mt-4">Images: Add up to 5 images</label>
                {imageUrls.map((url, index) => (
                    <div key={index} className="mt-1">
                        <div className="flex items-center gap-2">
                            <input
                                name="imageUrl"
                                data-index={index}
                                placeholder="Enter image URL..."
                                type="text"
                                value={url}
                                onChange={(e) => updateImageUrl(index, e.target.value)}
                                onBlur={handleBlur}
                                className={`w-full p-2 border ${errors.imageUrls?.[index] ? 'border-red-500' : 'border-gray-900'} rounded-lg shadow-sm`}
                            />
                            {imageUrls.length > 1 && (
                                <button type="button" onClick={() => removeImageUrl(index)} className="px-2 py-1 bg-red-600 text-white rounded-full">
                                    X
                                </button>
                            )}
                        </div>
                        {errors.imageUrls?.[index] && (
                            <p className="text-red-900 text-sm mt-1">{errors.imageUrls[index]}</p>
                        )}
                    </div>
                ))}

                <button type="button" onClick={addImageField} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full">
                    + Add Image
                </button>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-full"
                >
                    {isPending ? <span className="mr-2">🚫</span> : title}
                </button>
            </form>
        </section>
    );
}

PetForm.propTypes = {
    title: PropTypes.string.isRequired,
    formAction: PropTypes.func.isRequired,
    isPending: PropTypes.bool.isRequired,
    pet: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    imageUrls: PropTypes.array.isRequired,
    updateImageUrl: PropTypes.func.isRequired,
    removeImageUrl: PropTypes.func.isRequired,
    addImageField: PropTypes.func.isRequired
};