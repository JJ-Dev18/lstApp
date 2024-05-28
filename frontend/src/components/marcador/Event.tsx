import { StarIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, useColorMode } from '@chakra-ui/react'
import { FC } from 'react';
import { EventType } from '../../interfaces/marcador';

type Props = {
  event : EventType
}

export const Evento:FC<Props> = ({event}) => {
    const { colorMode  } = useColorMode();
    const { tiempo , tipo , jugadorId , comentario } = event
  return (
    <Box bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} p={4} borderRadius="md" w="full">
          <HStack spacing={4}>
            <Box bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'} p={2} borderRadius="md">
             <StarIcon/>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">{tipo}- {tiempo}</Text>
              <Text fontSize="sm">{jugadorId} (GSW) {comentario}</Text>
            </Box>
          </HStack>
        </Box>
  )
}
