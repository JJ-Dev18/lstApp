import axios from './axios';

export const login = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};
export const signup = async (email: string, password: string, nombre: string) => {
    const response = await axios.post('/auth/register', { email, password, nombre });
    localStorage.setItem('token', response.data.token);
    return response.data;
  };
export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};
