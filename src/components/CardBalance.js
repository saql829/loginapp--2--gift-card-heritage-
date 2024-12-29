import React, { useState } from 'react';
import axios from 'axios';

const CardBalance = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCardDetails = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `https://aptech.heritagejewels.com.pk/microservices/singlecard.php?cardnumber=${cardNumber}`
            );
            
            // Debugging response
            console.log(response.data); // Check the structure of the data

            // Assuming the card data is in response.data and contains cardnumber, cardbalance, etc.
            if (response.status === 200 && response.data && response.data.cardnumber) {
                setCardData(response.data);
            } else {
                setError('Card not found');
            }
        } catch (err) {
            setError('Error fetching card details');
            console.error(err); // Log error details
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Check Card Balance</h3>
            <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter Card Number"
            />
            <button onClick={fetchCardDetails} disabled={loading}>
                {loading ? 'Loading...' : 'Check Balance'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {cardData && (
                <div>
                    <h4>Card Balance: {cardData.balance}</h4> {/* Assuming 'balance' is the correct field */}
                    <p>Card Value: {cardData.cardvalue}</p>
                    <p>Card Number: {cardData.cardnumber}</p>
                </div>
            )}
        </div>
    );
};

export default CardBalance;
