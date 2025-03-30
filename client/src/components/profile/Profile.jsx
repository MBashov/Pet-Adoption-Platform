export default function Profile() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

            {/* Profile Hero Section */}
            <section className="profile-hero w-full bg-white shadow-lg p-6 mb-6">
                <div className="container text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
                    <p className="text-gray-600">
                        Welcome back, <span className="font-semibold">[UserName]</span>
                        <strong className="ml-2">([UserEmail])</strong>
                    </p>
                </div>
            </section>

            {/* Created Pets Section */}
            <section className="created-pets w-full bg-white shadow-lg p-6 mb-6">
                <div className="container">
                    <h3 className="text-xl font-semibold text-gray-700">Created Pets</h3>
                    <div className="pet-list mt-4">
                        {/* Render created pets here */}
                        {/* Example: */}
                        {/* <PetCard /> */}
                        <p className="text-gray-600">You haven&#39;t created any pets yet.</p>
                    </div>
                </div>
            </section>

            {/* Preferred Pets Section */}
            <section className="preferred-pets w-full bg-white shadow-lg p-6 mb-6">
                <div className="container">
                    <h3 className="text-xl font-semibold text-gray-700">Preferred Pets</h3>
                    <div className="pet-list mt-4">
                        {/* Render preferred pets here */}
                        {/* Example: */}
                        {/* <PetCard /> */}
                        <p className="text-gray-600">You haven&#39;t preferred any pets yet.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
