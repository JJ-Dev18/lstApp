import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  useEffect(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
