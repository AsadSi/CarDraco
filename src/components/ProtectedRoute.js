import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, path, isAuthenticated }) => {
  return isAuthenticated ? (
    element
    ) : (
    <Navigate to="/" replace state={{ from: path }} /> // Redirect to login if not authenticated
  );
};

export default ProtectedRoute;
