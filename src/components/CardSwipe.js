import React, { useState } from 'react';
import axios from 'axios';

const CardSwipe = ({ setCardNumber }) => {
    const [cardInput, setCardInput] = useState('');
    const [cardDetails, setCardDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSlip, setShowSlip] = useState(false); // State to toggle slip visibility
    const [showReceipt, setShowReceipt] = useState(false); // State to show receipt

    const handleCardSwipe = async () => {
        if (!cardInput) {
            setError('Please enter a card number.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `https://aptech.heritagejewels.com.pk/microservices/singlecard.php?cardnumber=${cardInput}`
            );
            console.log(response.data);  // Debugging response data

            if (response.data) {
                setCardDetails(response.data);
                setCardNumber(cardInput);
            } else {
                setError('Card not found or invalid.');
            }
        } catch (err) {
            setError('Error fetching card details.');
        } finally {
            setLoading(false);
        }
    };

    const handleShowReceipt = () => {
        setShowReceipt(true); // Show the receipt when user clicks 'Yes'
    };

    const handleHideReceipt = () => {
        setShowReceipt(false); // Hide the receipt
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Swipe Card</h2>
            <input
                type="text"
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                placeholder="Enter Card Number"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
                onClick={handleCardSwipe}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-md mt-2"
            >
                {loading ? 'Loading...' : 'Fetch Card Details'}
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            {cardDetails && (
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold">Card Number: {cardDetails[0].cardnumber}</h3>
                    <h4 className="text-lg">Card Balance: {cardDetails[0].cardbalance}</h4>
                    {/* Add other card details here */}
                </div>
            )}

            {/* Ask if the user wants to see the receipt */}
            {cardDetails && !showSlip && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setShowSlip(true)}
                        className="w-full bg-green-500 text-white py-2 rounded-md mt-2"
                    >
                        View Slip?
                    </button>
                </div>
            )}

            {/* If user wants to see the slip, display it */}
            {showSlip && !showReceipt && (
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold mb-2">Receipt</h3>
                    <p>Card Number: {cardDetails[0].cardnumber}</p>
                    <p>Card Balance: {cardDetails[0].cardbalance}</p>
                    <button
                        onClick={handleShowReceipt}
                        className="w-full bg-blue-500 text-white py-2 rounded-md mt-2"
                    >
                        Confirm Receipt
                    </button>
                    <button
                        onClick={handleHideReceipt}
                        className="w-full bg-red-500 text-white py-2 rounded-md mt-2"
                    >
                        Close Receipt
                    </button>
                </div>
            )}

            {/* Display the receipt if user confirms */}
            {showReceipt && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-center">Receipt Details</h3>
                    <p>Card Number: {cardDetails.cardnumber}</p>
                    <p>Card Balance: {cardDetails.cardbalance}</p>
                    <p>Card Value: {cardDetails.cardvalue}</p>
                    <p className="mt-4 text-gray-500">Thank you for using our service!</p>
                </div>
            )}
        </div>
    );
};

export default CardSwipe;
