import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const auth = JSON.parse(localStorage.getItem('auth')) || false;
  const role = localStorage.getItem('role');
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  // If not authenticated, redirect to home
  if (!auth || !role) {
    return <Navigate to="/" />;
  }

  // If required role is specified and user doesn't have it, redirect to home
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
