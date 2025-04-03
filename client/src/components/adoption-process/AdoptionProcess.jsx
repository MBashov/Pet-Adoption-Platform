import { Link } from 'react-router';
import { CheckCircle } from "lucide-react";

export default function AdoptionProcess() {
    const steps = [
        "Create an Account – Sign up on our platform to start your adoption journey.",
        "Find a Pet & Apply – Browse available pets and submit an adoption request.",
        "Complete the Adoption Form – Provide details about your home, lifestyle, and experience with pets.",
        "Wait for Our Response – Our team will review your application and contact you for the next steps."
    ];

    return (
        <div className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('/images/best3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-3xl mx-auto p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg text-center flex flex-col items-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Adoption Process</h2>
                <p className="text-gray-900 mb-6">
                    Read about the steps and requirements for adopting a pet.
                </p>

                <div className="space-y-6 w-full">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <CheckCircle className="text-green-500 w-6 h-6" />
                            <span className="text-lg font-medium text-gray-800">{index + 1}. {step}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full mt-6">
                    <Link to='/pets' className="px-6 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition">
                        Go to Pets
                    </Link>
                </div>
            </div>
        </div>
    );
}
