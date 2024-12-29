import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistoryAdmin = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(5); // You can adjust the number of transactions per page

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://aptech.heritagejewels.com.pk/microservices/transaction.php');
                console.log('First transaction:', response.data[0]); // Log first transaction to inspect structure
                setTransactions(response.data);
                setFilteredTransactions(response.data); // Initially set all transactions as filtered
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    // Search handler to filter transactions based on search query
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const filtered = transactions.filter((transaction) => {
            return (
                transaction.cardnumber?.toLowerCase().includes(e.target.value.toLowerCase()) ||
                transaction.amount?.toString().includes(e.target.value)
            );
        });
        setFilteredTransactions(filtered);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    // Pagination Logic
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredTransactions.length / transactionsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            {/* Search Box */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by Card Number or Amount"
                    className="p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A87E43] bg-white"
                />
            </div>

            {/* Transaction Table */}
            <table className="min-w-full bg-white table-auto border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left text-sm font-medium text-gray-500">Date Time</th>
                        <th className="p-2 text-left text-sm font-medium text-gray-500">Card Number</th>
                        <th className="p-2 text-left text-sm font-medium text-gray-500">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTransactions.map((transaction, index) => (
                        <tr key={`${transaction.cardnumber}-${index}`} className="hover:bg-gray-100">
                            <td className="p-2">{transaction.datecreated || 'N/A'}</td>
                            <td className="p-2">{transaction.cardnumber || 'N/A'}</td>
                            <td className="p-2">{transaction.amount || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={prevPage}
                    className="px-4 py-2 bg-[#A87E43] text-white rounded-lg shadow-md hover:bg-[#D8B46B] disabled:bg-gray-400"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <div>
                    <span className="font-medium">Page {currentPage}</span>
                </div>
                <button
                    onClick={nextPage}
                    className="px-4 py-2 bg-[#A87E43] text-white rounded-lg shadow-md hover:bg-[#D8B46B] disabled:bg-gray-400"
                    disabled={currentPage === Math.ceil(filteredTransactions.length / transactionsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionHistoryAdmin;
