import  { useRef } from 'react';
import { Box, Flex, Text, Badge, Button, useColorModeValue } from '@chakra-ui/react';
import { PartidoType } from '../../../../interfaces/marcador';
import { useNavigate } from 'react-router-dom';



export function MatchCard({ marcadorEquipo1,marcadorEquipo2,id,equipo1,equipo2,duracion,estado,fecha, }: PartidoType) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const dateColor = useColorModeValue('gray.500', 'gray.400');
  const scoreBgColor = useColorModeValue('gray.100', 'gray.700');
  const fechaDate = useRef( new Date(fecha))
  const navigate = useNavigate()
  return (
    <Box bg={bgColor} rounded="lg" shadow="md" overflow="hidden"
    //  sx={{width: '300px'}}
     >
      <Box p="4">
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold" >
            {equipo1.nombre}
          </Text>
          <Text fontSize="lg" fontWeight="bold" >
            {equipo2.nombre}
          </Text>
        </Flex>
        <Text color={dateColor} fontSize="sm" mt="1">
          {fechaDate.current.toLocaleDateString()} 
        </Text>
        <Text color={dateColor} fontSize="sm" mt="1">
           duracion : {duracion} minutos
        </Text>
      </Box>
      <Flex bg={scoreBgColor} px="4" py="3" roundedBottom="lg" justify="space-between" align="center">
        <Text fontSize="3xl" fontWeight="bold">
          {marcadorEquipo1} - {marcadorEquipo2}
        </Text>
        
        <Badge px="2" py="1" rounded="full" colorScheme={estado === 'SIN_JUGAR' ? 'default' : 'teal'} fontSize="xs">
          {estado}
        </Badge>
      </Flex>
      <Box p="4" textAlign="right">
        <Button isDisabled={estado === 'JUGADO'} variant="outline" size="sm" onClick={() => navigate(`/planillero/partidos/${id}`)}>
            Planillar
          {/* <InfoIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> */}
        </Button>
      </Box>
    </Box>
  );
}
