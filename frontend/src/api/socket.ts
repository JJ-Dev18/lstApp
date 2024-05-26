import { io } from 'socket.io-client';
import { getToken } from './auth';

const socket = io('http://localhost:3001', {
  withCredentials: true,
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
