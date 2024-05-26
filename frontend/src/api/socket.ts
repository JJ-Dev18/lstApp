import { io } from 'socket.io-client';
import { getToken } from './auth';

const socket = io(import.meta.env.VITE_API_URL_SOCKET, {
  withCredentials: true,
  path: '/socket.io',
  transports: ['websocket'], 
  auth: {
    token: getToken(),
  },
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
