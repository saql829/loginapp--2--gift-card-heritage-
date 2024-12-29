import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChargeCard = ({ cardNumber }) => {
    const [cardDetails, setCardDetails] = useState(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [transactionSuccess, setTransactionSuccess] = useState(false);

    useEffect(() => {
        const fetchCardDetails = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(
                    `https://aptech.heritagejewels.com.pk/microservices/singlecard.php?cardnumber=${cardNumber}`
                );
                setCardDetails(response.data);
            } catch (err) {
                setError('Error fetching card details');
            } finally {
                setLoading(false);
            }
        };

        if (cardNumber) {
            fetchCardDetails();
        }
    }, [cardNumber]);

    const handleTransaction = async () => {
        if (!amount || amount <= 0 || amount > cardDetails.balance) {
            setError('Invalid amount');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post(
                'https://aptech.heritagejewels.com.pk/microservices/addtransaction.php',
                {
                    cardNumber,
                    amount,
                    userId: 1, // Replace with actual logged-in user ID
                }
            );
            if (response.data.success) {
                setTransactionSuccess(true);
                setAmount(''); // Clear the input field after successful transaction
            } else {
                throw new Error('Transaction failed');
            }
        } catch (err) {
            setError(err.message || 'Error making transaction');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Charge Card</h2>
            {cardDetails ? (
                <div className="text-center">
                    <p>Card Number: {cardDetails[0].cardnumber}</p>
                    <p>Current Balance: {cardDetails[0].cardbalance}</p>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    />
                    <button
                        onClick={handleTransaction}
                        disabled={loading}
                        className="w-full bg-green-500 text-white py-2 rounded-md mt-2"
                    >
                        {loading ? 'Processing...' : 'Charge Card'}
                    </button>

                    {transactionSuccess && <p className="text-green-500 mt-4">Transaction successful!</p>}
                </div>
            ) : (
                <p>{error || 'No card details found.'}</p>
            )}
        </div>
    );
};

export default ChargeCard;
