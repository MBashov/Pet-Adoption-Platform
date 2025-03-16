import { Link } from 'react-router';

export default function Header() {
    return (
        <header className="bg-gray-900 text-white py-[34px] relative z-[999] block">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <h1 className="relative z-[999] float-none">
                    <Link
                        className="block mx-auto w-[130px] h-[66px]"
                        to="/"
                    >
                        <img
                            src="images/logo.png"
                            alt="PetAdopt Logo"
                            className="w-full h-full object-contain"
                        />
                    </Link>
                </h1>

                {/* Navigation */}
                <nav className="flex items-center space-x-8">
                    <Link to="/" className="text-[24px] hover:text-gray-00">
                        Home
                    </Link>
                    <Link to="/pets" className="text-[24px] hover:text-gray-300">
                        Available Pets
                    </Link>
                    <Link to="/adopt" className="text-[24px] hover:text-gray-300">
                        How to Adopt
                    </Link>

                    {/* Logged-in users */}
                    <div id="user" className="flex items-center space-x-4">
                        {/* Assume user is logged in */}
                        <Link to="/profile" className="text-[24px] hover:text-gray-300">
                            My Profile
                        </Link>
                        <Link to="/logout" className="text-[24px] hover:text-gray-300">
                            Logout
                        </Link>
                    </div>

                    {/* Guest users */}
                    <div id="guest" className="flex items-center space-x-4">
                        {/* Show if user is not logged in */}
                        <Link to="/login" className="text-[24px] hover:text-gray-300">
                            Login
                        </Link>
                        <Link to="/register" className="text-[24px] hover:text-gray-300">
                            Register
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
