import React, { useState, useEffect } from 'react';
import socket from '../api/socket';
import Timer from './Timer';

interface EventFormProps {
  partidoId: number;
  
}

const EventForm: React.FC<EventFormProps> = ({ partidoId }) => {
  const [tipo, setTipo] = useState('');
  const [jugadorId, setJugadorId] = useState<number | ''>('');
  const [comentario, setComentario] = useState('');
  const [time, setTime] = useState('');

  const handleTimeUpdate = (formattedTime: string) => {
    setTime(formattedTime);
  };

  useEffect(() => {
    const handleTimeUpdate = ({ partidoId: updatePartidoId, time: currentTime }: { partidoId: number; time: number }) => {
      if (updatePartidoId === partidoId) {
        const formattedTime = formatTime(currentTime);
        setTime(formattedTime);
      }
    };

    socket.on('timeUpdate', handleTimeUpdate);

    return () => {
      socket.off('timeUpdate', handleTimeUpdate);
    };
  }, [partidoId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      tipo,
      jugadorId: Number(jugadorId),
      tiempo: time, // Tiempo en formato "MM:SS"
      partidoId,
      comentario,
    };

    socket.emit('register', eventData, (response: { status: string; evento?: any; error?: string }) => {
      if (response.status === 'success' && response.evento) {
        console.log('Evento registrado:', response.evento);
     
      } else {
        console.error('Error registrando el evento:', response.error);
      }
    });

    // Limpiar el formulario después de enviar
    setTipo('');
    setJugadorId('');
    setComentario('');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <Timer partidoId={partidoId} onTimeUpdate={handleTimeUpdate} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Evento:</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID del Jugador:</label>
          <input
            type="number"
            value={jugadorId}
            onChange={(e) => setJugadorId(e.target.value ? Number(e.target.value) : '')}
            required
          />
        </div>
        <div>
          <label>Comentario:</label>
          <input
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <button type="submit">Registrar Evento</button>
      </form>
    </div>
  );
};

export default EventForm;
