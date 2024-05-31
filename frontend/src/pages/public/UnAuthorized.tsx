// UnauthorizedPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])
  
  return (
    <div>
      <h1>Acceso no autorizado</h1>
      <p>No tienes permiso para ver esta página.</p>
    </div>
  );
};

export default UnauthorizedPage;
