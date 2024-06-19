import { Box  } from '@chakra-ui/react';
import  Header  from './components/partido/Header';
import  MatchInfo  from './components/partido/MatchInfo';
import { LiveEvents } from './components/partido/LiveEvents';
// import { Teams } from './components/partido/Teams';
// import { MatchSummary } from './components/partido/MatchSummary';
import {  useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventTracker } from './components/partido/EventTracker';
import { EventForm } from './components/partido/EventForm';
import { useEvent } from '../../hooks/useEvents';


export const PartidoPage = () => {

  const { partidoId } = useParams()
 
  const [selectedEvent, setSelectedEvent] = useState<string>('gol');
  const { planillero, terminarPartido,maxTimeReached,events , isPaused,handleTimerActions, handleDelete, time , marcador, equipos, isConnected, fecha  , handleSubmit} = useEvent(partidoId)
 

  

  const handleSelectEvent = (event: string) => {
    setSelectedEvent(event);
  };

  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    
    <Box className="flex   flex-col h-screen ">  
    <Header isConnected={isConnected}  marcador1={marcador.marcadorEquipo1} marcador2={marcador.marcadorEquipo2} equipo1={equipos?.equipo1} equipo2={equipos?.equipo2} time={formatTime(time)} />
    <Box className="p-4" maxWidth="1900px" >
     
      <MatchInfo planillero={planillero} fecha={fecha}/>
      <LiveEvents events={events} onDelete={handleDelete} equipo1={equipos?.equipo1.nombre}/>
      {/* <Box p={6} bg="gray.100" minH="100vh"> */}
      <EventTracker maxTimeReached={maxTimeReached} terminarPartido={terminarPartido} time={formatTime(time)} isPaused={isPaused} handleTimerActions={handleTimerActions} selectedEvent={selectedEvent} onSelectEvent={handleSelectEvent} />
      
       <EventForm handleSubmit={handleSubmit} team1={equipos?.equipo1} team2={equipos?.equipo2} selectedEvent={selectedEvent} />
      
     
    {/* </Box> */}
      {/* <Teams />
      <MatchSummary /> */}
    </Box>
  </Box>

    
  )
}
