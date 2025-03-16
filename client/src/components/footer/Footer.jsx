export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 w-full mt-auto">
            <div className="container mx-auto text-center">
                {/* Social Icons */}
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="#" className="w-8 h-8 bg-gray-700 rounded-full inline-block"></a>
                    <a href="#" className="w-8 h-8 bg-gray-700 rounded-full inline-block"></a>
                    <a href="#" className="w-8 h-8 bg-gray-700 rounded-full inline-block"></a>
                    <a href="#" className="w-8 h-8 bg-gray-700 rounded-full inline-block"></a>
                </div>

                {/* Footer Text */}
                <p className="text-sm">
                    Pet Club &copy; 2025 | <a href="#" className="underline">Privacy Policy</a> |
                    Design by: <a href="https://github.com/MBashov" className="underline">Mehmed Bashov</a>
                </p>
            </div>
        </footer>
    );
}
