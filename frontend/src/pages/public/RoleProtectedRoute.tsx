import React  from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useStore from '../../store/store';
import { Role } from '../../interfaces/auth';

interface RoleProtectedRouteProps {
  allowedRoles: Role[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
  const { token, user } = useStore((state) => ({
    token: state.token,
    user: state.user
  }));

  // const [loading, setLoading] = useState(true);
  const location = useLocation();



  // if (loading) {
  //   return <Progress size='xs' isIndeterminate />; // Puedes reemplazar esto con un spinner o cualquier componente de carga
  // }

  if (!token) {
    return <Navigate to="/inicio" state={{ from: location }} />;
  }

  if (user && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
