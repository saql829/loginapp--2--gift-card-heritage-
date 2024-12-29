import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CardSwipe from './CardSwipe';
import ChargeCard from './ChargeCard';
import TransactionHistory from './TransactionHistory';
import AllCards from './Pages/AllCards';
import TransactionHistoryAdmin from './Pages/TransactionHistoryAdmin';
import ManageCards from './Pages/ManageCards';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';

// Import necessary components for Chart.js
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register components with Chart.js
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { logout } = useAuth();
    const [cardNumber, setCardNumber] = useState('');
    const [role, setRole] = useState('');

    // Fetch role from localStorage on component mount
    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole) {
            setRole(userRole);
        } else {
            setRole('shopUser'); // Default to shopUser if no role is found
        }
    }, []);

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Card Usage Over Time',
                data: [10, 20, 30, 40, 50],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true
            }
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto bg-darkGray shadow-lg rounded-lg min-h-screen">
            <div className="flex justify-between items-center mb-6">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img src="https://heritagejewels.com.pk/cdn/shop/files/png.png?v=1729942276&width=190" alt="Logo" className="w-12 h-12" />
                    <h1 className="text-4xl font-bold text-gold">
                        {role === 'admin' ? 'Admin Dashboard' : 'Shop User Dashboard'}
                    </h1>
                </div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="bg-gold text-darkGray py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Conditional Content for Admin and Shop User */}
            {role === 'admin' ? (
                // Admin Dashboard Content
                <div className="flex gap-6">
                    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gold">All Cards</h2>
                        <AllCards />
                    </div>

                    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gold">Transaction History</h2>
                        <TransactionHistoryAdmin />
                    </div>

                    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gold">Manage Cards</h2>
                        <ManageCards />
                    </div>
                </div>
            ) : (
                // Shop User Dashboard Content
                <div className="flex gap-6">
                    {/* Card Swipe Section */}
                    <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gold">Swipe Card</h2>
                        <CardSwipe setCardNumber={setCardNumber} />
                        
                        {/* Charge Card Section */}
                        {cardNumber && (
                            <div className="mt-6">
                                <ChargeCard cardNumber={cardNumber} />
                            </div>
                        )}
                    </div>

                    {/* Space Between Card Swipe and Chart */}
                    <div className="w-4 md:w-4 bg-transparent"></div>

                    {/* Card Usage Stats Section (Chart) */}
                    <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gold">Card Usage Stats</h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            )}

            {/* Transaction History Table */}
            <div className="w-full bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                <TransactionHistory />
            </div>
        </div>
    );
};

export default Dashboard;
