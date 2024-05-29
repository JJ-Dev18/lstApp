import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/auth';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Usuario } from '@prisma/client';
import { AuthenticatedRequest } from '../types/types';
import prisma from '../config/database';


const router = Router();
const MAX_TIME = 1 * 60; // 120 minutos en segundos
let timerIntervals: { [key: number]: NodeJS.Timeout | undefined } = {};
let currentTimes: { [key: number]: number } = {};

const registerEventHandlers = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    // console.log(`Client connected: ${socket.id}`);

    socket.on('joinRoom', ({ partidoId }) => {
      const roomName = `partido_${partidoId}`;
      socket.join(roomName);
      // console.log(`Client with ID ${socket.id} joined room: ${roomName}`);

      // Send the current time to the newly connected client
      socket.emit('timeUpdate', { partidoId, time: currentTimes[partidoId] || 0 });
    });

    socket.on('startTimer', ({ partidoId }) => {
      if (!currentTimes[partidoId]) {
        currentTimes[partidoId] = 0;
      }

      if (!timerIntervals[partidoId]) {
        timerIntervals[partidoId] = setInterval(() => {
          currentTimes[partidoId]++;
          if (currentTimes[partidoId] >= MAX_TIME) {
            clearInterval(timerIntervals[partidoId]);
            timerIntervals[partidoId] = undefined;
            io.to(`partido_${partidoId}`).emit('timeUpdate', { partidoId, time: currentTimes[partidoId] });
            io.to(`partido_${partidoId}`).emit('maxTimeReached', { partidoId });
          } else {
            io.to(`partido_${partidoId}`).emit('timeUpdate', { partidoId, time: currentTimes[partidoId] });
          }
        }, 1000);
      }
    });

    socket.on('pauseTimer', ({ partidoId }) => {
      if (timerIntervals[partidoId]) {
        clearInterval(timerIntervals[partidoId]);
        timerIntervals[partidoId] = undefined;
      }
    });

    socket.on('resetTimer', ({ partidoId }) => {
      currentTimes[partidoId] = 0;
      io.to(`partido_${partidoId}`).emit('timeUpdate', { partidoId, time: currentTimes[partidoId] });
    });

    socket.on('register', async (data, callback) => {
      const { tipo, tiempo, jugadorId, partidoId, comentario } = data;
      const user = socket.data.user;
     
      if (!user) {
        return callback({ error: 'Usuario no autenticado' });
      }

      // Validar que el tiempo esté en formato "MM:SS"
      if (!/^\d{2}:\d{2}$/.test(tiempo)) {
        return callback({ error: 'Formato de tiempo no válido. Se espera "MM:SS".' });
      }

      try {
        const evento = await prisma.evento.create({
          data: {
            tipo,
            tiempo, // Manejado como cadena en formato "MM:SS"
            jugadorId,
            partidoId,
            comentario,
            planilleroId: user.id,
          },
        });
        const roomName = `partido_${partidoId}`;
        callback({ status: 'success', evento });
        io.to(roomName).emit('newEvent', evento);
        // console.log(evento,'se emitio el evento a todos lados') // Emitir evento a todos los clientes en la sala del partido
      } catch (error) {
        callback({ status: 'error', error: 'Error al registrar el evento' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

// Endpoint para obtener eventos por partido
router.get('/partido/:partidoId/eventos', ensureAuthenticated, async (req: AuthenticatedRequest, res) => {
  const { partidoId } = req.params;

  try {
    const eventos = await prisma.evento.findMany({
      where: { partidoId: Number(partidoId) },
      orderBy: { tiempo: 'asc' },
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
});

export { router as eventRouter, registerEventHandlers };
