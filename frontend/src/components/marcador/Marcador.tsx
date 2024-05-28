import {  Box, Flex, Text, VStack, HStack, IconButton, Select, Button, useColorMode, Image } from "@chakra-ui/react";
import { BellIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import Logo from '../../assets/uro.png'
import socket from "../../api/socket";
import { useEffect, useState } from "react";
import instance from "../../api/axios";
import { Evento } from "./Event";
import { EventType } from "../../interfaces/marcador";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import AddEventForm from "../planillero/AddEventForm";

function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle Theme"
    />
  );
}

function Marcador() {
  const { colorMode } = useColorMode();
  const [events, setEvents] = useState<EventType[]>([]);
  const [time, settime] = useState(0)
  const { partidoId } = useParams()

  console.log(events,"events")

  useEffect(() => {
    const connect = async () => {
      console.log(partidoId,"partidoID")
      if(partidoId){
        // socket.auth(getToken())
        socket.emit('joinRoom', { partidoId });
        await instance.get(`/events/partido/${partidoId}/eventos`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asume que el token está almacenado en localStorage
          },
        })
          .then(response => setEvents(response.data))
          .catch(error => console.error('Error fetching events:', error));
      }

    }
    // // connect()
    // if(partidoId){
    //   socket.emit('joinRoom', { partidoId });
    //   instance.get(`/events/partido/${partidoId}/eventos`,{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asume que el token está almacenado en localStorage
    //     },
    //   })
    //     .then(response => setEvents(response.data))
    //     .catch(error => console.error('Error fetching events:', error));
    // }
    connect()
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

    socket.on('newEvent', (event: EventType) => {
      setEvents((prevstate) => [...prevstate,event]);
    });

    return () => {
      socket.off('newEvent');
    };
  }, [socket]);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
      <Layout>
      <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" textAlign="center">Uro vs Oru</Text>
      <Timer partidoId={Number(partidoId)} settime={settime} />
      <Box bg={colorMode === 'dark' ? 'gray.300' : 'gray.200'} p={4} mt={6} borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Image src={Logo} alt="Team 1 "
                  boxSize={{ base: "50px", md: "50px" }}
                  objectFit="contain" />
          </Box>
          <Text fontSize="2xl" fontWeight="bold">2 - 1</Text>
          <Box>
            <Image src={Logo} alt="Team2"
                  boxSize={{ base: "50px", md: "50px" }}
                  objectFit="contain" />
          </Box>
        </Flex>
      </Box>

      <VStack align="start" spacing={4} mt={6}>
        <Text fontSize="xl" fontWeight="bold">Events</Text>
         {
          events.map( (evento:EventType) => (
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