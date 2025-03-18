import authService from "../../services/authService";

export default function Login() {

    const formAction = (formData) => {
        const { email, password } = Object.fromEntries(formData);

        fetch('http://localhost:3030/users/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password})})
            .then(res => res.json())
            .then(result => localStorage.setItem('userData', JSON.stringify(result)))
            .catch(err => console.log(err.message))

    }


    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

                <form action={formAction} id="login" className="space-y-4">
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
                            type="submit" value="Login" />
                    </div>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </p>
            </div>
        </section>
    );
}