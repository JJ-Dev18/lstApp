import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useStore from '../../store/store';
import { Role } from '../../interfaces/auth';

interface RoleProtectedRouteProps {
  allowedRoles: Role[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
  const { token, checkToken, user } = useStore((state) => ({
    token: state.token,
    checkToken: state.checkToken,
    user: state.user
  }));

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      await checkToken();
      setLoading(false);
    };
    verifyToken();
  }, [checkToken]);

  if (loading) {
    return <div>Loading...</div>; // Puedes reemplazar esto con un spinner o cualquier componente de carga
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
