import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuthRequest from "../../hooks/useAuthRequest";
import { Menu, X } from "lucide-react";

export default function Header() {
    const { isAuthenticated, email } = useAuthRequest();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 text-white py-4 px-4 md:px-8">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="w-32">
                    <img src="/images/logo.png" alt="PetAdopt Logo" className="w-full h-auto object-contain" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-lg">
                    <NavLink to="/"
                        className={({ isActive, isPending }) =>
                            `${isPending ? "text-white" : isActive ? "text-blue-400" : ""} hover:text-gray-300`}>
                        Home
                    </NavLink>
                    <NavLink to="/pets"
                        className={({ isActive, isPending }) =>
                            `${isPending ? "text-white" : isActive ? "text-blue-400" : ""} hover:text-gray-300`}>
                        Available Pets
                    </NavLink>

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <NavLink to="/add-pet"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : ""} hover:text-gray-300`}>
                                Add Pet
                            </NavLink>

                            <NavLink to="/profile"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : ""} hover:text-gray-300`}>
                                My Profile
                            </NavLink>

                            <NavLink to="/logout" className="hover:text-gray-300">Logout</NavLink>
                            <span className="text-blue-400">{email}</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <NavLink to="/Login"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : ""} hover:text-gray-300`}>
                                Login
                            </NavLink>

                            <NavLink to="/register"
                                className={({ isActive, isPending }) =>
                                    `${isPending ? "text-white" : isActive ? "text-blue-400" : ""} hover:text-gray-300`}>
                                Register
                            </NavLink>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 text-white absolute top-16 left-0 w-full py-4 px-6 space-y-4">
                    <Link to="/" className="block hover:text-gray-300">Home</Link>
                    <Link to="/pets" className="block hover:text-gray-300">Available Pets</Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/add-pet" className="block hover:text-gray-300">Add Pet</Link>
                            <Link to="/profile" className="block hover:text-gray-300">My Profile</Link>
                            <Link to="/logout" className="block hover:text-gray-300">Logout</Link>
                            <span className="block text-blue-400">{email}</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block hover:text-gray-300">Login</Link>
                            <Link to="/register" className="block hover:text-gray-300">Register</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}
