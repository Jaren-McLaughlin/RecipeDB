import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/MockAuthContext'; // Make sure this path is correct

const ProtectedRoute = () => {
  // Get auth context safely with fallbacks
  const authContext = useContext(AuthContext);
  // Safely access authentication state with a fallback
  const isAuthenticated = authContext?.isAuthenticated || false;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  // If authenticated, render the child route
  return <Outlet />;
};

export default ProtectedRoute;