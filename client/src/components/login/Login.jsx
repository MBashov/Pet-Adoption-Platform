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
    const [inValidEmail, setInValidEmail] = useState(false);
    const [mismatch, setMismatch] = useState(false);

    const handleFocus = () => {
        setMismatch(false);
        setInValidEmail(false);
    }

    const loginHandler = async (_, formData) => {

        const { email, password } = Object.fromEntries(formData);

        setEmail(email);

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm)) {
            setInValidEmail(true);
            return;
        }

        try {
            const authData = await login(email, password);
            authHandler(authData);
            navigate('/');
            toast.success('Successful Login');
        } catch {
            setMismatch(true);
            toast.error('Email or password don\'t match');

        }
    }

    const [_, action, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <section className="flex justify-center items-center min-h-screen"
            style={{
                backgroundImage: "url('/images/best3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="shadow-lg rounded-lg mb-30 p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

                <form action={action} id="login" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-900 font-semibold">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            defaultValue={email}
                            onFocus={handleFocus}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${mismatch || inValidEmail ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                        />
                        {inValidEmail && <p className="text-red-900 text-sm mt-1">Invalid Email</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-900 font-semibold">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onFocus={handleFocus}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${mismatch ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                        />
                    </div>

                    <div className="text-center  items-center">
                        <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer min-w-[120px] flex justify-center items-center"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? <span className="mr-2">🚫</span> : 'Login'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-900 mt-4">
                    Don&#39;t have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                </p>
            </div>
        </section>
    );
}