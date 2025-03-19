import { useNavigate } from 'react-router'
import { useActionState, useContext } from 'react'

import authService from "../../services/authService";
import { userContext } from '../../contexts/userContext';

export default function Login() {

    const navigate = useNavigate();
    const { authHandler } = useContext(userContext);

    const loginHandler = async (previousState, formData) => {

        const userData = Object.fromEntries(formData);

        try {
            const user = await authService.login(userData);
            localStorage.setItem('userData', JSON.stringify(user));
            authHandler(user);
            navigate('/');

        } catch (err) {
            console.log(err.message);
        }
        return userData;
    }

    const [state, action, isPending] = useActionState(loginHandler, { email: '', password: '' });
    //TODO: Password is vissible in state


    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

                <form action={action} id="login" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
                        <input type="password" name="password" id="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="text-center">
                        <input className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
                            type="submit" value={isPending ? 'Proccesing...' : "Login"} disabled={isPending} />
                    </div>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </p>
            </div>
        </section>
    );
}

//TODO Change button style while fetching