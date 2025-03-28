import { Link, useNavigate } from 'react-router'
import { useActionState, useState } from 'react';
import { toast } from "react-toastify";

import { useRegister } from '../../api/authApi';
import { useUserContext } from '../../contexts/UserContext';


export default function Register() {

    const navigate = useNavigate();
    const { register } = useRegister();
    const { authHandler, } = useUserContext();
    const [email, setEmail] = useState('');
    const [passMismatch, setPassMismatch] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleFocus = () => {
        setEmailError(false);
        setPassMismatch(false);
    };

    const registerHandler = async (_, formData) => {

        const { email, password, confirmPassword } = Object.fromEntries(formData);
        setEmail(email);

        if (password !== confirmPassword) {
            setPassMismatch(true);
            return toast.error('Wrong passwords');
        }

        try {
            const authData = await register(email, password);
            authHandler(authData);
            navigate('/');

        } catch (err) {

            if (err.code === 409) {
                setEmailError(true);
            }
            toast.error(err.message);
        }
    };

    const [_, action, isPending] = useActionState(registerHandler, { email: '', password: '', confirmPassword: '' });

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>

                <form action={action} id="register" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="maria@email.com"
                            defaultValue={email}
                            onFocus={handleFocus}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="register-password"
                            onFocus={handleFocus}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passMismatch ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onFocus={handleFocus}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passMismatch ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                        />
                    </div>

                    <div className="text-center">
                        <input className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
                            type="submit" value={isPending ? 'Proccesing...' : 'Register'} disabled={isPending} />
                    </div>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                </p>
            </div>
        </section>
    );
}