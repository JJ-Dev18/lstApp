import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/auth';

const ProtectedRoute: React.FC = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
