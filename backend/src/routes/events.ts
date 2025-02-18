import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/auth';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Usuario } from '@prisma/client';
import { AuthenticatedRequest } from '../types/types';
import prisma from '../config/database';
import { actualizarEstadisticas } from './estadisticas';
import { actualizarMarcador } from '../utils/marcador';


const router = Router();
let timerIntervals: { [key: number]: NodeJS.Timeout | undefined } = {};
let currentTimes: { [key: number]: number } = {};
let MAX_TIME = 120 * 60; // 120 minutos en segundos

const registerEventHandlers = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);
    // console.log(socket.data,"socket")
    socket.on('joinRoom', async ({ partidoId } : {partidoId : number}) => {
      // console.log('join')
      const roomName = `partido_${partidoId}`;
      socket.join(roomName);
      const partido = await prisma.partido.findFirst( {
        where : {
          id : Number(partidoId)
        },
        
      })
      MAX_TIME = partido?.duracion  ? partido.duracion * 60 : 120 * 60 
      // Send the current time to the newly connected client
      io.to(roomName).emit('timeUpdate', { partidoId, time: currentTimes[partidoId] || 0 });
      
      console.log(`Client with ID ${socket.id} joined room: ${roomName}`);
    });

    socket.on('startTimer', ({ partidoId }:{partidoId:number}) => {
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
            console.log(currentTimes[partidoId],"partidoDI")
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
      console.log(socket.data,"scoket data")
      if (!user) {
        return callback({ error: 'Usuario no autenticado' });
      }
      if(!jugadorId){
        return callback({ error: `Jugador no seleccionado para el evento ${tipo}` });
      }
      console.log(data)
      // Validar que el tiempo esté en formato "MM:SS"
      // if (!/^\d{2}:\d{2}$/.test(tiempo)) {
      //   return callback({ error: 'Formato de tiempo no válido. Se espera "MM:SS".' });
      // }

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
          include:{
            jugador : {
                include :{
                    equipo: true
                }
            }
            
        }
        })
        const roomName = `partido_${partidoId}`;
        callback({ status: 'success', evento });
        
        io.to(roomName).emit('newEvent', evento);
        await actualizarEstadisticas(tipo,jugadorId,partidoId)
        await actualizarMarcador(partidoId,jugadorId,tipo)
        const partidoActualizado = await prisma.partido.findUnique({
          where: { id: partidoId },
        });
       
        io.to(roomName).emit('updateScore', partidoActualizado);

        console.log(evento,'se emitio el evento a todos lados') // Emitir evento a todos los clientes en la sala del partido
      } catch (error) {
        console.log(error)
        callback({ status: 'error', error: error });
      }
    });
    socket.on('deleteEvent', async (data, callback = () => {}) => {
      // events = events.filter(event => event.id !== eventId); // En producción, elimina esto de la base de datos.
    const { eventId, partidoId } = data;
    const user = socket.data.user;
    console.log(eventId, "EVENTiD ")
    if (!user) {
      return callback({ error: 'Usuario no autenticado' });
    }
    console.log('se recibio un evento de eliminacion ')
    try {
      const evento = await prisma.evento.delete({
        where: { id: eventId }
      });

      const roomName = `partido_${partidoId}`;
      callback({ status: 'success', eventId });

      io.to(roomName).emit('eventDeleted', { eventId });
      await actualizarEstadisticas(evento.tipo,evento.jugadorId,Number(partidoId),true)
      await actualizarMarcador(Number(partidoId),evento.jugadorId,evento.tipo,true)
      const partidoActualizado = await prisma.partido.findUnique({
        where: { id: Number(partidoId) },
      });
     
      io.to(roomName).emit('updateScore', partidoActualizado);
      
    } catch (error) {
      console.log(error)
      callback({ status: 'error', error: error });
    }
  }
  );
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

router.delete('/:eventoId', async (req,res) => {
  try {
      const { eventoId } = req.params
      const deleteEvento = await prisma.evento.delete({
          where: {
            id: Number(eventoId),
          },
        })
      res.status(200).json({message : 'Evento eliminado exitosamente'})  
  } catch (error) {
      res.status(500).json({error : error})
      
  }
})

export { router as eventRouter, registerEventHandlers };
