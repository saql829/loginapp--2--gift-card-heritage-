import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import the AuthContext to check authentication

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();  // Get authentication status

    if (!isAuthenticated) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return children;  // Render children components if authenticated
};

export default ProtectedRoute;
