import { useNavigate } from 'react-router'
import { useActionState, useContext } from 'react';

import { userContext } from '../../contexts/userContext';
import authService from '../../services/authService';


export default function Register() {
    
    const navigate = useNavigate();
    const {authHandler} = useContext(userContext);

    const registerHandler = async (previousState, formData) => {

        const userData = Object.fromEntries(formData);

        try {
            const user = await authService.register(userData);
            localStorage.setItem('userData', JSON.stringify(user));
            authHandler(user);
            navigate('/');

        } catch (err) {
            console.log(err.message);
        }
        return userData;
    }

    const [state, action, isPending] = useActionState(registerHandler, { email: '', password: '', confirmPassword: '' })
  //TODO: Password is vissible in state

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>

                <form action={action} id="register" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                        <input type="email" id="email" name="email" placeholder="maria@email.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
                        <input type="password" name="password" id="register-password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Confirm Password:</label>
                        <input type="password" name="confirmPassword" id="confirmPassword"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="text-center">
                        <input className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
                            type="submit" value={isPending ? 'Proccesing...' : 'Register'} disabled={isPending} />
                    </div>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                </p>
            </div>
        </section>
    );
}
 //TODO Change button style while fetching