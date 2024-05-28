import React, { useEffect, useState } from 'react';
import socket from '../../api/socket';
import { Box, Flex, HStack, IconButton, Text, useColorMode } from '@chakra-ui/react';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
interface TimerProps {
  partidoId: number;
  settime : React.Dispatch<React.SetStateAction<number>>
}

const Timer: React.FC<TimerProps> = ({ partidoId , settime}) => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isActive, setIsActive] = useState(false);
  const { colorMode  } = useColorMode();
  
  // const handleTimeUpdate = (formattedTime: number) => {
  //   setTime(formattedTime);
  // };
  useEffect(() => {
    const handleTimeUpdate = ({ partidoId: updatePartidoId, time: currentTime }: { partidoId: number; time: number }) => {
      if (updatePartidoId === partidoId) {
        setTime(currentTime);
        settime(currentTime)
        // const formattedTime = formatTime(currentTime);
        // onTimeUpdate(formattedTime);
      }
    };

    socket.on('timeUpdate', handleTimeUpdate);

    return () => {
      socket.off('timeUpdate', handleTimeUpdate);
    };
  }, [partidoId]);

  const startTimer = () => {
    setIsActive(true);
    socket.emit('startTimer', { partidoId });
  };

  const pauseTimer = () => {
    setIsActive(false);
    socket.emit('pauseTimer', { partidoId });
  };

  const resetTimer = () => {
    setIsActive(false);
    socket.emit('resetTimer', { partidoId });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return {
      minutes : minutes,
      seconds : seconds 
    }
    // return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // useEffect(() => {
  //   // Reset time when partidoId changes
  //   setTime(0);
  //   setIsActive(false);
  // }, [partidoId]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {/* <h1>{formatTime(time)}</h1> */}
      <Flex justifyContent="center" mt={4}>
        <HStack spacing={8}>
          <Box textAlign="center" bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} p={4} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">{formatTime(time).minutes}</Text>
            <Text fontSize="sm">minutos</Text>
          </Box>
          <Box textAlign="center" bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} p={4} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">{formatTime(time).seconds}</Text>
            <Text fontSize="sm">Seconds</Text>
          </Box>
        </HStack>
        
        
      </Flex>

      <Flex  mt={2} justifyContent="space-around">
          
          <IconButton
           p={2}
            w={8} h={8}
            bg='gray.700'
            aria-label='Search database'
            as={FaPause}
            onClick={pauseTimer}
          />
       
         
       <IconButton
            p={2}
            w={8} h={8}
            bg='gray.700'
            aria-label='Search database'
            as={FaPlay}
            onClick={startTimer}
          />
          
         
          <IconButton
           p={2}
            w={8} h={8}
            bg='gray.700'
            aria-label='Search database'
            as={VscDebugRestart}
            onClick={resetTimer}
          />
         
        </Flex>
    </Box>
  );
};

export default Timer;
