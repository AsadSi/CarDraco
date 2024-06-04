import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, path, isAuthenticated }) => {
  return isAuthenticated ? (
    element
    ) : (
    <Navigate to="/" replace state={{ from: path }} />
  );
};

export default ProtectedRoute;
