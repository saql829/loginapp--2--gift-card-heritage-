import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCards = () => {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(5);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('https://aptech.heritagejewels.com.pk/microservices/giftcard.php');
                setCards(response.data); // Assuming response contains card data
                console.log("All cards: ", response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    // Filter cards based on the search term
    const filteredCards = cards.filter(
        (card) =>
            card.cardnumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.cardbalance.toString().includes(searchTerm)
    );

    // Calculate index of last card and first card of the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    // Handle page navigation
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4">
                    <h2 className="text-xl font-semibold text-gray-700">All Gift Cards</h2>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Search by Card Number or Balance"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-4 text-left text-sm font-medium text-gray-600">Card Number</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-600">Balance</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCards.map((card, index) => (
                                <tr key={`${card.cardNumber}-${index}`} className="hover:bg-gray-100">
                                    <td className="p-4 text-sm text-gray-700">{card.cardnumber}</td>
                                    <td className="p-4 text-sm text-gray-700">{card.cardbalance}</td>
                                    <td className="p-4 text-sm text-gray-700">
                                        <button
                                            onClick={() => alert(`View details for card ${card.cardnumber}`)}
                                            className="bg-gradient-to-r from-[#D8B46B] to-[#A87E43] text-white py-1 px-3 rounded-md hover:from-[#A87E43] hover:to-[#D8B46B] transition duration-300"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination controls */}
                <div className="flex justify-between items-center p-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gradient-to-r from-[#D8B46B] to-[#A87E43] text-white rounded-md disabled:opacity-50 hover:from-[#A87E43] hover:to-[#D8B46B] transition duration-300"
                    >
                        Previous
                    </button>
                    <div className="text-sm text-gray-600">
                        Page {currentPage} of {Math.ceil(filteredCards.length / cardsPerPage)}
                    </div>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}
                        className="px-4 py-2 bg-gradient-to-r from-[#D8B46B] to-[#A87E43] text-white rounded-md disabled:opacity-50 hover:from-[#A87E43] hover:to-[#D8B46B] transition duration-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllCards;
