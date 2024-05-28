import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../../store/store';

const ProtectedRoute: React.FC = () => {
   const token = useStore((state) => state.token);
   const checkToken = useStore((state) => state.checkToken);
   const [loading, setLoading] = useState(true);
 
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
  return token ? 
      <Outlet/>
   : <Navigate to="/login" />;
};

export default ProtectedRoute;
