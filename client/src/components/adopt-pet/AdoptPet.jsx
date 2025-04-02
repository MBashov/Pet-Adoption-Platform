import { useActionState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { useAdoptPet, useCheckIfAdopted } from "../../api/adoptApi";
import { usePet } from "../../api/petsApi";
import useAuthRequest from "../../hooks/useAuthRequest";
import Spinner from "../spinner/Spinner";

export default function AdoptPet() {
    const navigate = useNavigate();
    const { adopt } = useAdoptPet();
    const { petId } = useParams();
    const { pet } = usePet(petId);
    const { userId } = useAuthRequest();
    const { isAdopted, isLoading } = useCheckIfAdopted(userId, petId);
    const petName = pet?.name;

    useEffect(() => {

        if (isAdopted) {
            toast.info(`You've already applied to adopt ${petName}. Thank you for your interest!`);
            return navigate('/');
        }

    }, [isAdopted, navigate, petName]);

    const adoptHandler = async (_, formData) => {
        const userData = Object.fromEntries(formData);

        try {

            await adopt(userData, petId);
            navigate('/succesfully-adopt');

        } catch (err) {
            toast.error(err.message);
        }
    }

    const [_, formAction, isPending] = useActionState(adoptHandler, { name: "", email: "", phone: "", reason: "", livingSituation: "", });

    if (isLoading || !petName) {
        return <Spinner />;
    }

    return (
        <section className="min-h-screen flex items-center justify-center p-6"
            style={{
                backgroundImage: "url('/images/best3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Apply to adopt {pet.name}
                </h2>
                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-gray-900 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full p-2 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-900 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-2 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-900 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full p-2 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-900 font-medium">Why do you want to adopt?</label>
                        <textarea
                            name="reason"
                            required
                            className="w-full p-2 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-300"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-900 font-medium">Living Situation</label>
                        <select
                            name="livingSituation"
                            required
                            className="w-full p-2 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-300"
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
                        {isPending ? <span className="mr-2">🚫</span> : 'Submit Application'}
                    </button>
                </form>
            </div>
        </section>
    );
}
