import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider context
import Login from './components/Login';  // Import Login component
import Dashboard from './components/Dashboard';  // Import the updated Dashboard component
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute for authentication check
import SuperAdminDashboard from './components/Pages/SuperAdminDashboard';

const App = () => {
    return (
        <AuthProvider> {/* Auth provider to manage authentication context */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />  {/* Login page */}
                    <Route path="/login" element={<Login />} />  {/* Login page */}
                    
                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />  {/* Render Dashboard based on role */}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute>
                                <SuperAdminDashboard />  {/* Render Dashboard based on role */}
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
