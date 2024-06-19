import {  Text,  Card } from '@chakra-ui/react';
import { Evento } from '../../../../components/marcador/Event';
import { EventoType } from '../../../../interfaces/marcador';

export function LiveEvents({ equipo1 ,events, onDelete } : { events : EventoType[],equipo1? : string , onDelete : (id?:number) => void}) {
  // const events = [
  //   { time: '7:15', event: 'Goal', team: 'Red Foxes', color: 'red.500' },
  //   { time: '8:30', event: 'Assist', team: 'Blue Jays', color: 'blue.500' },
  //   { time: '9:45', event: 'Timeout', team: 'Red Foxes', color: 'red.500' },
  //   { time: '11:00', event: 'Block', team: 'Blue Jays', color: 'blue.500' },
  // ];
  
  return (
    <Card  p={4} rounded="lg" mb={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>Eventos</Text>
      <Text fontSize="sm" color="gray.400">
        {events.map((evento:EventoType) => (
          <Evento 
          align={evento.jugador?.equipo.nombre === equipo1 ? 'left' : 'right'}
          color={evento.jugador?.equipo.nombre === equipo1 ? 'green.50' : 'red.50'}
          key={evento.id} event={evento}
          onDelete={onDelete}
          
          />
          // <Flex justify="space-between" align="center" mb={2} key={index}>
          //   <Box>
          //     <Text as="span" fontWeight="bold">{time}</Text> - {event}
          //   </Box>
          //   <Box bg={color} rounded="full" px={2} py={1}>{team}</Box>
          // </Flex>
        ))}
      </Text>
      {/* <Text textAlign="right" fontSize="sm" color="gray.400" mt={2}>Time: 12:00</Text> */}
    </Card>
  );
}