import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = function({ children }) {
  let authData = useAuth();
  let isAuthenticated = authData.isAuthenticated;
  let isAdmin = authData.isAdmin;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default AdminRoute;
