import { Link } from 'react-router';
import useAuthRequest from '../../hooks/useAuthRequest';


export default function Header() {

    const { isAuthenticated, email } = useAuthRequest();

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
                            src="/images/logo.png"
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

                    {isAuthenticated
                        ? (
                            <div id="user" className="flex items-center space-x-4">
                                <Link to="/add-pet" className="text-[24px] hover:text-gray-300">
                                    Add Pet
                                </Link>
                                <Link to="/profile" className="text-[24px] hover:text-gray-300">
                                    My Profile
                                </Link>
                                <Link to="/logout" className="text-[24px] hover:text-gray-300">
                                    Logout
                                </Link>
                                <div className="text-[24px] text-blue-400 hover:text-blue-500">{email}</div>
                            </div>)
                        : (
                            <div id="guest" className="flex items-center space-x-4">
                                <Link to="/login" className="text-[24px] hover:text-gray-300">
                                    Login
                                </Link>
                                <Link to="/register" className="text-[24px] hover:text-gray-300">
                                    Register
                                </Link>
                            </div>)
                    }
                </nav>
            </div>
        </header>
    );
}