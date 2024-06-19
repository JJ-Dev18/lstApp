
import {  SimpleGrid, Button, Text, Flex, IconButton, Card } from '@chakra-ui/react';
import { FaPlay, FaPause, FaHandPaper, FaHandsHelping, FaClock, FaHeart, FaStopwatch } from 'react-icons/fa';
import { LuGoal } from 'react-icons/lu';

const events = [
  { name: 'gol', icon: LuGoal },
  { name: 'bloqueo', icon: FaHandPaper },
  { name: 'asistencia', icon: FaHandsHelping },
  { name: 'Time out', icon: FaClock },
  { name: 'Tiempo de espiritu', icon: FaHeart },
  { name: 'Medio tiempo', icon: FaStopwatch }
];
interface EventTrackerProps {
    onSelectEvent: (event: string) => void;
    selectedEvent: string;
    time : string;
    isPaused : boolean;
    handleTimerActions : () => void 
    terminarPartido :  () => Promise<void>
    maxTimeReached : boolean
  }
  
export function EventTracker({maxTimeReached,terminarPartido, onSelectEvent, selectedEvent, isPaused , handleTimerActions, time }: EventTrackerProps) {
 
  
  return (
    <Card  p={4} rounded="lg" shadow="md">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Seguidor de eventos </Text>
        <Flex align="center">
          <Text mr={2}>{time}</Text>
          {maxTimeReached 
          ? <Button onClick={terminarPartido}> Terminar partido </Button> 
          : <IconButton
            aria-label="Pause or Start"
            icon={isPaused ? <FaPlay /> : <FaPause />}
            onClick={handleTimerActions}
          />}
         
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
        {events.map(event => (
         <Button
         isDisabled={isPaused} 
         key={event.name}
         leftIcon={<event.icon />}
         variant={selectedEvent === event.name ? "solid" : "outline"}
         colorScheme={selectedEvent === event.name ? "blue" : undefined}
         onClick={() => onSelectEvent(event.name)}
       >
         {event.name}
       </Button>
        ))}
      </SimpleGrid>
    </Card>
  );
}
