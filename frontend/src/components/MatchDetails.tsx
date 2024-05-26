import React, { useEffect, useState } from 'react';
import instance from '../api/axios';
import { Event } from './Events';
import socket from '../api/socket';
type Props = {
    partidoId : number | null
}
const MatchDetails: React.FC<Props> = ({partidoId}) => {
//   const { partidoId } = useParams<{ partidoId: string }>();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    console.log(partidoId,"partidoID")
    if(partidoId){
      socket.emit('joinRoom', { partidoId });
      instance.get(`/events/partido/${partidoId}/eventos`)
        .then(response => setEvents(response.data))
        .catch(error => console.error('Error fetching events:', error));
    }
  }, [partidoId]);

    // useEffect(() => {
  //   if (partidoId !== null) {
  //     socket.emit('joinRoom', { partidoId });
      
  //     // Fetch events for the partido
  //     instance.get(`/events/partido/${partidoId}/eventos`)
  //     .then((response:any) => {
  //       console.log(response,"response")
  //       setEvents(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching events:', error);
  //     });
  //   }
  // }, [partidoId]);

  useEffect(() => {

    socket.on('newEvent', (event: Event) => {
      setEvents((prevEvents) => [...prevEvents, event]);
    });

    return () => {
      socket.off('newEvent');
    };
  }, [socket]);

  return (
    <div className="match-details-container">
      <h2>Detalles del Partido {partidoId}</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.tipo} - Jugador ID: {event.jugadorId} - Tiempo: {event.tiempo} - Comentario: {event.comentario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchDetails;
