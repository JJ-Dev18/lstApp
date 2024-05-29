import React, { useEffect, useState } from 'react';

import { Box, Flex, HStack, IconButton, Text, useColorMode } from '@chakra-ui/react';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

interface TimerProps {
  time : number;
  startTimer : () => void
  pauseTimer : () => void 
  resetTimer : ()=> void 
  // settime : React.Dispatch<React.SetStateAction<number>>
}

const Timer: React.FC<TimerProps> = ({ time ,startTimer,pauseTimer,resetTimer}) => {
  // const [time, setTime] = useState(0); // Time in seconds
  const { colorMode  } = useColorMode();
  const [timeFormat, settimeFormat] = useState({
    minutes : 0,
    seconds : 0
  })
  // const handleTimeUpdate = (formattedTime: number) => {
  //   setTime(formattedTime);
  // };
 
   useEffect(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    settimeFormat({
      minutes,
      seconds
    })
    
   }, [time])
   
 

  

  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return {
  //     minutes : minutes,
  //     seconds : seconds 
  //   }
  //   // return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  // };

  // useEffect(() => {
  //   // Reset time when partidoId changes
  //   setTime(0);
  //   setIsActive(false);
  // }, [partidoId]);

  return (
    <Box   maxW={{ base: "100%", md: "80%", lg: "1200px" }} mx="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {/* <h1>{formatTime(time)}</h1> */}
      <Flex justifyContent="center" mt={4}>
        <HStack spacing={8}>
          <Box textAlign="center" bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} p={4} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">{timeFormat.minutes}</Text>
            <Text fontSize="sm">minutos</Text>
          </Box>
          <Box textAlign="center" bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} p={4} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">{timeFormat.seconds}</Text>
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
