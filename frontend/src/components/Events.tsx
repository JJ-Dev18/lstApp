import React, {  useState } from 'react';
import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';
import MatchDetails from './MatchDetails';

export interface Event {
  id: number;
  tipo: string;
  tiempo: string;
  jugadorId: number;
  partidoId: number;
  comentario?: string;
  planilleroId: number;
}

const Events: React.FC = () => {
  const [partidoId, setPartidoId] = useState<number | null>(null);
  const navigate = useNavigate();
  console.log(import.meta.env)
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

 

  // const handleEventRegistered = (event: Event) => {
  //   setEvents((prevEvents) => [...prevEvents, event]);
  // };

  

  const handleLogout = () => {
    localStorage.removeItem('token'); // Asegúrate de limpiar cualquier token de autenticación
    navigate('/login');
  };

  return (
    <div className="events-container">
    <div>
    <h2>Eventos del Partido</h2>
    <button onClick={handleLogout}>Logout</button>
      <label>ID del Partido:</label>
      <input
        type="number"
        value={partidoId || ''}
        onChange={e => setPartidoId(e.target.value ? Number(e.target.value) : null)}
      />
    </div>
    {partidoId && (
      <>
        {/* <Timer partidoId={partidoId} onTimeUpdate={console.log} /> */}
        <EventForm partidoId={partidoId}  />
      </>
    )}
    <MatchDetails partidoId={partidoId}/>
    {/* <ul>
       {events.map(event => (
          <li key={event.id}>
            <a href={`/partido/${event.partidoId}`}>
              {event.tipo} - Jugador ID: {event.jugadorId} - Tiempo: {event.tiempo} - Comentario: {event.comentario}
            </a>
          </li>
        ))}
    </ul> */}
  </div>
  );
};

export default Events;
