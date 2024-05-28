// import './types/types';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import './config/passport';
import authRoutes from './routes/auth';
import jugadoresRoutes from './routes/jugadores';
import partidosRoutes from './routes/partidos';


import { eventRouter, registerEventHandlers } from './routes/events';
import { Usuario } from '@prisma/client';
import { PrismaClient } from '@prisma/client'

dotenv.config();

const prisma = new PrismaClient(); 
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  path: '/socket.io',
  cors: {
    origin: ['https://livescoretracking.online', 'https://www.livescoretracking.online','http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: ['https://livescoretracking.online', 'https://www.livescoretracking.online','http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/events', eventRouter);
app.use('/jugadores', jugadoresRoutes)
app.use('/partidos', partidosRoutes)


io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret') as Usuario;
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

registerEventHandlers(io);

// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });



export { app, server };
