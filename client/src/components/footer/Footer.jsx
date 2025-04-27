import { SiFacebook, SiInstagram, SiX, SiLinkedin } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-3 mt-auto">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-4 mb-2">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                        <SiFacebook size={20} className="text-white" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                        <SiInstagram size={20} className="text-white" />
                    </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                        <SiX size={20} className="text-white" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                        <SiLinkedin size={20} className="text-white" />
                    </a>
                </div>

                <p className="text-sm">
                    Pet Club &copy; 2025 |
                    Design by: <a href="https://github.com/MBashov" className="underline">Mehmed Bashov</a>
                </p>
            </div>
        </footer>
    );
}