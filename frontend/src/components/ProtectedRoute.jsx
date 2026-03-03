import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = function({ children }) {
  let authData = useAuth();
  let isAuthenticated = authData.isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
