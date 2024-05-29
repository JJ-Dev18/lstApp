import {  Box, Flex, Text, VStack,useColorMode, Image } from "@chakra-ui/react";
import Logo from '../../assets/uro.png'
import { useEffect, useState } from "react";
import instance from "../../api/axios";
import { Evento } from "./Event";
import {  EventoType, PartidoType } from "../../interfaces/marcador";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import AddEventForm from "../planillero/AddEventForm";
import useSocket from "../../hooks/useSocket";

type Marcador = {
  marcadorEquipo1: number,
  marcadorEquipo2 : number
}

function Marcador() {
  const { colorMode } = useColorMode();
  const [events, setEvents] = useState<EventoType[]>([]);
  const [time, settime] = useState(0)
  const { partidoId } = useParams()
  const [equipos, setEquipos] = useState({
    equipo1 : '',
    equipo2 : ''
  })
  const [marcador, setmarcador] = useState<Marcador>({
    marcadorEquipo1: 0 ,
    marcadorEquipo2: 0
  })
  const { socket, isConnected } = useSocket(); 
  
  useEffect(() => {
    if (socket) {
      const handleNewEvent = (event: EventoType) => {
        console.log(event, "event received");
        setEvents((prevstate) => [...prevstate, event]);
      };

      socket.on('newEvent', handleNewEvent);

      // Clean up the listener when the component unmounts or when socket changes
      return () => {
        socket.off('newEvent', handleNewEvent);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const updateScore = (partido: PartidoType) => {
         setmarcador({
          marcadorEquipo1 : partido.marcadorEquipo1,
          marcadorEquipo2 : partido.marcadorEquipo2
         })
      };

      socket.on('updateScore', updateScore);

      // Clean up the listener when the component unmounts or when socket changes
      return () => {
        socket.off('updateScore', updateScore);
      };
    }
  }, [socket]);
  useEffect(() => {
    const connect = async () => {
    
      if(partidoId){
           await instance.get(`/partidos/${partidoId}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asume que el token está almacenado en localStorage
          },
        })
          .then( response => {
            setEvents(response.data.eventos)
            setmarcador({
              marcadorEquipo1 : response.data.marcadorEquipo1,
              marcadorEquipo2 : response.data.marcadorEquipo2
            })
            setEquipos({
              equipo1 : response.data.equipo1.nombre,
              equipo2 : response.data.equipo2.nombre

            })
          })
          .catch(error => console.error('Error fetching events:', error));
          if(socket){
            socket.emit('joinRoom', { partidoId });
        }
      }

    }
    
    connect()
  }, [partidoId,socket]);
  console.log(time,"time")
  useEffect(() => {
    // const handleTimeUpdate = ({ partidoId: updatePartidoId, time: currentTime }: { partidoId: number; time: number }) => {
    //   console.log(currentTime,"currentTime")
    //   if (updatePartidoId === Number(partidoId)) {
    //     settime(currentTime);
    //   }
    // };
    console.log(socket,"socket");
    if(socket){
      console.log(socket,"socket desde timeUpdate")
      socket.on('timeUpdate', (data:any)=> {
        console.log(data,"datatimeupdate")
        settime(data.time)
      });
      return () => {
        socket.off('timeUpdate', () => {});
      };
    }else{
      console.log('no hay socket')
    }
  }, [socket,partidoId]);

  const startTimer = () => {
    if(socket){
      
      socket.emit('startTimer', { partidoId });
    }
  };

  const pauseTimer = () => {
    if(socket){
     
      socket.emit('pauseTimer', { partidoId });
    }
  };

  const resetTimer = () => {
    if(socket){
      
      socket.emit('resetTimer', { partidoId });
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
      <Layout>
     
      <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" textAlign="center">{equipos.equipo1} vs {equipos.equipo2}</Text>
      <Text fontSize={{ base: "2xl", md: "1xl" }} fontWeight="bold" textAlign="center"> {isConnected && 'On'}</Text>
      
      <Timer startTimer={startTimer} pauseTimer={pauseTimer} resetTimer={resetTimer} time={time} />
      <Box bg={colorMode === 'dark' ? 'gray.300' : 'gray.200'} p={4} mt={6} borderRadius="md" height={200} alignContent="center">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Image src={Logo} alt="Team 1 "
                  boxSize={{ base: "100px", md: "100px" }}
                  objectFit="contain" />
          </Box>
          <Text fontSize="4xl" fontWeight="bold">{marcador.marcadorEquipo1} - {marcador.marcadorEquipo2}</Text>
          <Box>
            <Image src={Logo} alt="Team2"
                  boxSize={{ base: "100px", md: "50px" }}
                  objectFit="contain" />
          </Box>
        </Flex>
      </Box>
    
      <VStack align="start" spacing={4} mt={6}>
        <Text fontSize="xl" fontWeight="bold">Events</Text>
         {
          events.map( (evento:EventoType) => (
            <Evento key={evento.id} event={evento}    />
          ))
         }
       
       
      </VStack>
       <AddEventForm partidoId={partidoId} time={formatTime(time)}/>

      {/* <Select placeholder="Select event" mt={4} variant="filled" size="md">
        <option value="Gol">Gol</option>
        <option value="Bloqueo">Bloqueo</option>
        <option value="Asistencia">Asistencia</option>
      </Select>

      <Flex mt={4} justifyContent="space-between">
        <Button variant="solid" size="md" width="48%">Add Event</Button>
        <Button variant="outline" size="md" width="48%">Cancel</Button>
      </Flex> */}
      </Layout>
  );
}


export default Marcador