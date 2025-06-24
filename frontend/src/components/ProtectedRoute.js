// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user); // Get user state from Redux

  return user ? element : <Navigate to="/AdminLogin" />; // Redirect to user login if not authenticated
};

export default ProtectedRoute;