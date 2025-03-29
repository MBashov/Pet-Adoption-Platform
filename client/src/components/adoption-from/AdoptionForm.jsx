import { useActionState } from "react";
import { useNavigate, useParams } from "react-router";

import { useAdoptPet } from "../../api/adoptApi";
import { toast } from "react-toastify";
import { usePet } from "../../api/petsApi";


export default function AdoptionForm() {
    const navigate = useNavigate();
    const { adopt } = useAdoptPet();
    const { petId } = useParams();
    const { pet } = usePet(petId);

    const adoptHandler = async (_, formData) => {
        const userData = Object.fromEntries(formData);

        try {
            await adopt(userData);
            navigate('/succesfully-adopt');
            toast.success('Form Submitted Successfully');

        } catch (err) {
            toast.error(err.message);
        }

    }

    const [_, formAction, isPending] = useActionState(adoptHandler, { name: "", email: "", phone: "", reason: "", livingSituation: "", });

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Apply to Adopt {pet.name}
                </h2>
                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Why do you want to adopt?</label>
                        <textarea
                            name="reason"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Living Situation</label>
                        <select
                            name="livingSituation"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select an option</option>
                            <option value="Apartment">Apartment</option>
                            <option value="House with Yard">House with Yard</option>
                            <option value="Shared Living">Shared Living</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </section>
    );
}
