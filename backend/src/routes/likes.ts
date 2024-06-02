import { Server as SocketIOServer, Socket } from 'socket.io';
import prisma from '../config/database';


const registrarLikes = (io: SocketIOServer) => {
    io.on('connection', async (socket) => {
        console.log('Usuario conectado');
        const likeCount = await prisma.like.count();
        socket.emit('likeCount', likeCount);
       
        socket.on('like', async () => {
            await prisma.like.create({ data: {} });
            const updatedLikeCount = await prisma.like.count();
            io.emit('likeCount', updatedLikeCount);
          });
      
        socket.on('like', () => {
          
        });
      
        socket.on('disconnect', () => {
          console.log('Usuario desconectado');
        });
      });
}

export default registrarLikes