import React from 'react';
import AllCards from './AllCards'; // Import the AllCards component
import TransactionHistoryAdmin from './TransactionHistoryAdmin'; // Import the TransactionHistoryAdmin component
import ManageCards from './ManageCards'; // Optional, for managing cards

const SuperAdminDashboard = () => {

    // Function to handle logout (you'll need to implement the logic for clearing session/token)
    const handleLogout = () => {
        // Example: Clear session storage or token here
        localStorage.removeItem('authToken'); // Adjust as per your authentication logic
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header Section with Custom Gradient Color */}
            <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-[#D8B46B] to-[#A87E43] p-6 shadow-md rounded-lg">
                <img 
                    src="https://aptech.heritagejewels.com.pk/logo.png" // URL of Heritage logo
                    alt="Heritage Jewels Logo"
                    className="h-12" // Adjust size as needed
                />
                <h1 className="text-3xl font-bold text-white">Super Admin Dashboard</h1>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-[#D8B46B] to-[#A87E43] text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 focus:outline-none transition-all duration-300 ease-in-out"
                >
                    Logout
                </button>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Cards Management Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Cards</h2>
                    <AllCards />
                </div>

                {/* Transaction History Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
                    <TransactionHistoryAdmin />
                </div>

                {/* Optional Manage Cards Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Cards</h2>
                    <ManageCards />
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-[#fdfdfd] text-[#1a1a1a] shadow-inner pt-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Top Section: Logo and Contact Details */}
                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start pb-10">
                        {/* Logo and Address */}
                        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
                            <img 
                                src="https://heritagejewels.com.pk/cdn/shop/files/Untitled_design_50.png?v=1729943578&width=190" 
                                alt="Heritage Jewels Logo" 
                                className="mb-4 w-32 h-auto"
                            />
                            <p className="text-sm">2nd Floor Ocean Mall Clifton, Karachi</p>
                            <p className="text-sm mt-2">
                                <a href="mailto:heritage.jewels@hotmail.com" className="hover:underline">
                                    heritage.jewels@hotmail.com
                                </a>
                            </p>
                            <p className="text-sm mt-2">
                                <a href="tel:+922135821232" className="hover:underline">
                                    +92 2135821232
                                </a>
                            </p>
                            {/* Social Media Links */}
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="hover:text-[#d4af37]"><i className="fab fa-facebook fa-lg"></i></a>
                                <a href="#" className="hover:text-[#d4af37]"><i className="fab fa-instagram fa-lg"></i></a>
                                <a href="#" className="hover:text-[#d4af37]"><i className="fab fa-twitter fa-lg"></i></a>
                            </div>
                        </div>
                        {/* Quick Links */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center lg:text-left">
                            {/* Quick Links Section */}
                            <div>
                                <h4 className="font-bold text-lg mb-4 text-[#d4af37]">Quick Links</h4>
                                <ul>
                                    <li><a href="#" className="hover:text-[#d4af37]">Contact Us</a></li>
                                    <li><a href="#" className="hover:text-[#d4af37]">Terms of Service</a></li>
                                    <li><a href="#" className="hover:text-[#d4af37]">Privacy Policy</a></li>
                                </ul>
                            </div>
                            {/* Information Section */}
                            <div>
                                <h4 className="font-bold text-lg mb-4 text-[#d4af37]">Information</h4>
                                <ul>
                                    <li><a href="#" className="hover:text-[#d4af37]">About Us</a></li>
                                    <li><a href="#" className="hover:text-[#d4af37]">Buy At Store</a></li>
                                    <li><a href="#" className="hover:text-[#d4af37]">After Sale Service</a></li>
                                </ul>
                            </div>
                            {/* Policy Section */}
                            <div>
                                <h4 className="font-bold text-lg mb-4 text-[#d4af37]">Policy</h4>
                                <ul>
                                    <li><a href="#" className="hover:text-[#d4af37]">Refund & Exchange Policy</a></li>
                                    <li><a href="#" className="hover:text-[#d4af37]">FAQs</a></li>
                                    <li><a href="#" className="hover:text-[#d4af37]">How to Order</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Section */}
                    <div className="border-t border-[#d4af37] pt-6 text-center">
                        <p className="text-sm text-[#1a1a1a]">
                            &copy; 2024 <span className="font-bold">Heritage Jewels</span>. All Rights Reserved.
                        </p>
                        <div className="flex justify-center mt-4 space-x-2">
                            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="w-8 h-8" />
                            <img src="https://img.icons8.com/color/48/mastercard.png" alt="MasterCard" className="w-8 h-8" />
                            <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" className="w-8 h-8" />
                            <img src="https://img.icons8.com/color/48/google-pay.png" alt="Google Pay" className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
