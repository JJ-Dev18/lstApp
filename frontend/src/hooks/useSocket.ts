import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { getToken } from '../api/auth';
import { EventType, EventoType, PartidoType } from '../interfaces/marcador';

interface ServerToClientEvents {
  // Define aquí los eventos que el servidor puede emitir
  newEvent: (event: EventoType) => void;
  timeUpdate: (data: { partidoId: number; time: number }) => void;
  updateScore : (partido:PartidoType) => void
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  // Define aquí los eventos que el cliente puede emitir
  register: (eventData: any, callback: (response: { status: string; evento?: any; error?: string }) => void) => void;
  joinRoom : ({ partidoId }:{ partidoId:string | undefined }) => void
  startTimer : ({partidoId } :{partidoId :string | undefined }) => void
  pauseTimer : ({partidoId } :{partidoId :string  | undefined }) => void
  resetTimer : ({partidoId } :{partidoId :string  | undefined }) => void

 
}

const useSocket = (ubicacion?:string): { socket: Socket<ServerToClientEvents, ClientToServerEvents> | null, isConnected: boolean } => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      const newSocket = io(import.meta.env.VITE_API_URL_SOCKET, {
        withCredentials: true,
        path: '/socket.io',
        transports: ['websocket'],
        auth: {
          token: token,
        },
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to server ');
        console.log("conectado desde",ubicacion)
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from server');
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return { socket, isConnected };
};

export default useSocket;
