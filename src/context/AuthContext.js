import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();  // Create a context for authentication

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle login
    const login = async (username, password) => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.post(
                'https://aptech.heritagejewels.com.pk/microservices/login.php',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            const data = response.data;
            // console.log("data: ",data); // Log the data for debugging
            
            if (response.status === 200 && data.success) {
                setIsAuthenticated(true);
                // console.log("Data role: ", data.role);
                localStorage.setItem('role', data.user.username); // Store the role in localStorage
                return true;
            } else {
                setError(data.message || 'Login failed');
                return false;
            }
        } catch (err) {
            setError('Error during login: ' + err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };
    

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('role');  // Remove role on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);  // Custom hook to access AuthContext
