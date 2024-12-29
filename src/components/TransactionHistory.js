import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(
                    'https://aptech.heritagejewels.com.pk/microservices/transaction.php'
                );
                setTransactions(response.data);
            } catch (err) {
                setError('Error fetching transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.cardnumber.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h3 className="text-3xl font-semibold text-center text-blue-700 mb-6">
                    Transaction History
                </h3>

                {/* Search Input */}
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by card number..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                            <thead className="bg-blue-500">
                                <tr>
                                    <th className="px-6 py-3 text-left text-white uppercase font-medium">
                                        Transaction ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-white uppercase font-medium">
                                        Card Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-white uppercase font-medium">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-white uppercase font-medium">
                                        Date Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTransactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="hover:bg-blue-50 transition duration-150"
                                    >
                                        <td className="px-6 py-4 border-t border-gray-200">
                                            {transaction.id}
                                        </td>
                                        <td className="px-6 py-4 border-t border-gray-200">
                                            {transaction.cardnumber}
                                        </td>
                                        <td className="px-6 py-4 border-t border-gray-200">
                                            {transaction.amount}
                                        </td>
                                        <td className="px-6 py-4 border-t border-gray-200">
                                            {transaction.datecreated}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {filteredTransactions.length > transactionsPerPage && (
                    <div className="mt-6 flex justify-between items-center">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition ${
                                currentPage === 1 && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <p className="text-gray-600">
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition ${
                                currentPage === totalPages && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistory;
