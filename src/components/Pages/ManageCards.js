import React, { useState } from 'react';
import axios from 'axios';

const ManageCards = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [balance, setBalance] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use your API endpoint for adding/editing card details
            await axios.post('https://aptech.heritagejewels.com.pk/microservices/addtransaction.php', {
                cardNumber,
                balance,
            });
            alert('Card managed successfully');
        } catch (error) {
            alert('Error managing card');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Manage Card</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter card number"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600">Balance</label>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter balance"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#D8B46B] to-[#A87E43] text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-[#A87E43] transition duration-300"
                    >
                        Manage Card
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageCards;
