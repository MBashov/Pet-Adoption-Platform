import { Link } from "react-router";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</h2>
            <p className="text-lg text-gray-500 mt-2">The page you are looking for does not exist or has been moved.</p>
            
            <Link to="/" className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-600 transition">
                Go Home
            </Link>
        </section>
    );
}