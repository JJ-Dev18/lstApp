import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  VStack,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import socket from '../../api/socket';

type Props = {
  time : string ,
  partidoId : string | undefined
}
const AddEventForm: React.FC<Props> = ({time,partidoId}) => {
  const [eventType, setEventType] = useState('');
  const [player, setPlayer] = useState('');
  const { colorMode  } = useColorMode();
  const [comment, setComment] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de agregar evento
    const eventData = {
      tipo : eventType,
      jugadorId: Number(player),
      tiempo: time, // Tiempo en formato "MM:SS"
      partidoId : Number(partidoId),
      comment,
    };
    try {
      // Lógica para enviar el evento a tu API
      console.log({ eventType, player, comment });
      socket.emit('register', eventData, (response: { status: string; data?: any; error?: string }) => {
        console.log('Evento registrado:', response);
        if (response.status === 'success' && response.data) {
          toast({
            title: 'Event added.',
            description: 'The event has been added successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Error adding event.',
            description: 'There was an error adding the event.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          console.error('Error registrando el evento:', response.error);
        }
      });
  
     
    } catch (error) {
      toast({
        title: 'Error adding event.',
        description: 'There was an error adding the event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box  bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} maxW="md" mx="auto" mt={8} p={6} boxShadow="lg"  borderRadius="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="eventType" isRequired>
            <FormLabel>Type of Event</FormLabel>
            <Select
              placeholder="Select event type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="goal">Goal</option>
              <option value="assist">Assist</option>
              <option value="foul">Foul</option>
              <option value="card">Card</option>
            </Select>
          </FormControl>

          <FormControl id="player" isRequired>
            <FormLabel>Player</FormLabel>
            <Select
              placeholder="Select player"
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
            >
              <option value="1">Player 1</option>
              <option value="2">Player 2</option>
              <option value="3">Player 3</option>
              {/* Aquí puedes cargar la lista de jugadores desde tu API */}
            </Select>
          </FormControl>

          <FormControl id="comment">
            <FormLabel>Comment</FormLabel>
            <Textarea
              placeholder="Add your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Add Event
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddEventForm;
