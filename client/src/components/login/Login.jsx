import { useActionState, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from "react-toastify";

import { useLogin } from '../../api/authApi';
import { useUserContext } from '../../contexts/UserContext';

export default function Login() {

    const navigate = useNavigate();
    const { authHandler } = useUserContext();
    const { login } = useLogin();
    const [email, setEmail] = useState('');
    const [mismatch, seMismatch] = useState(false);

    const handleFocus = () => {
        seMismatch(false);
    }

    const loginHandler = async (_, formData) => {

        const { email, password } = Object.fromEntries(formData);
        setEmail(email);
        
        try {
            const authData = await login(email, password);
            authHandler(authData);
            navigate('/');
        } catch {
            seMismatch(true);
            toast.error('Email or password don\'t match');
            
        }
    }

    const [_, action, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

                <form action={action} id="login" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            defaultValue={email}
                            onFocus={handleFocus}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                mismatch ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                            }`}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onFocus={handleFocus}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                mismatch ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                            }`} 
                        />
                    </div>

                    <div className="text-center">
                        <input
                            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
                            type="submit"
                            value={isPending ? 'Logging...' : "Login"} disabled={isPending}
                        />
                    </div>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don&#39;t have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                </p>
            </div>
        </section>
    );
}

