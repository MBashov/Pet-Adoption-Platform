import { Link, NavLink } from "react-router";
import useAuthRequest from "../../hooks/useAuthRequest";

export default function Header() {
    const { isAuthenticated, email } = useAuthRequest();

    return (
        <header className="bg-gray-900 text-white py-4 px-4 md:px-8">
            <div className="container mx-auto flex justify-between items-center">

                <Link to="/" className="w-32">
                    <img src="/images/logo.png" alt="PetAdopt Logo" className="w-full h-auto object-contain" />
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-lg">
                    <NavLink to="/"
                        className={({ isActive, isPending }) =>
                            `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                        Home
                    </NavLink>
                    <NavLink to="/pets"
                        className={({ isActive, isPending }) =>
                            `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                        Available Pets
                    </NavLink>

                    {isAuthenticated && (
                        <div className="flex items-center space-x-4">
                            <NavLink to="/add-pet"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                                Add Pet
                            </NavLink>

                            <NavLink to="/profile"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                                My Profile
                            </NavLink>

                            <NavLink to="/about"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                                About
                            </NavLink>

                            <NavLink to="/logout" className="hover:text-gray-300">Logout</NavLink>
                            <span className="text-blue-400">{email}</span>
                        </div>
                    )}

                    {!isAuthenticated &&
                        <div className="flex items-center space-x-4">
                            <NavLink to="/about"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                                About
                            </NavLink>

                            <NavLink to="/Login"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                                Login
                            </NavLink>

                            <NavLink to="/register"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : "text-white"} hover:text-gray-300`}>
                                Register
                            </NavLink>
                        </div>
                    }
                </nav>
            </div>
        </header>
    );
}
