import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(username, password);
        if (success) {
            const role = localStorage.getItem("role");
            console.log("sucess:  ", success);
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="https://heritagejewels.com.pk/cdn/shop/files/png.png?v=1729942276&width=190" alt="Logo" className="w-24 h-24" />
                </div>
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 hover:border-indigo-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 hover:border-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
                            loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 bg-red-100 text-red-500 text-center p-3 rounded-lg">
                        <p>{error}</p>
                    </div>
                )}

                <div className="mt-6 text-center text-gray-600">
                    <p>
                        Don't have an account?{' '}
                        <a href="/signup" className="text-indigo-600 hover:text-indigo-700">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
