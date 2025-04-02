import { Link } from "react-router";

import { CheckCircleIcon } from "@heroicons/react/solid";

export default function AdoptionSuccess() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-gray-100 p-6"
        style={{
            backgroundImage: "url('/images/paws.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        >
            <div className="p-10 rounded-2xl shadow-2xl text-center w-full max-w-lg">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-extrabold text-green-500 mb-4">Application Submitted!</h2>
                <p className="text-gray-900 text-lg mb-6">
                    Thank you for your adoption request. Our team will review your application and get back to you soon.
                </p>
                <Link
                    to="/"
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg font-semibold"
                >
                    Return Home
                </Link>
            </div>
        </section>
    );
}
