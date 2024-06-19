import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Equipo } from '../../../../interfaces/marcador';

type Props = {
  equipo1?: Equipo;
  equipo2?: Equipo;
  marcador1 : number;
  marcador2: number;
  time: string;
  isConnected: boolean
}
const Header:FC<Props> = ({equipo1,equipo2,time,marcador1,marcador2,isConnected}) =>  {

  return (
    <Flex  display="flex" p={4} justify="space-between" align="center" py={16} px={8} >
      <Flex align="center" gap={2}>
        <Image bg="red.500" src={equipo1?.logo} rounded="full" w={8} h={8} alt='logo equipo'/>
        <Text fontSize="xl" fontWeight="bold">{equipo1?.nombre}</Text>
      </Flex>
      <Box>
      
      <Badge px="2" py="1" rounded="full" colorScheme={isConnected  ? 'teal' : 'red'} fontSize="xs">
         { isConnected ? 'Online' : 'Offline'}
        </Badge>
      <Text fontSize="2xl" fontWeight="bold">{marcador1} - {marcador2}</Text>
      <Text className="text-sm text-gray-400" >Time: {time}</Text>
      
      </Box>
      
      <Flex align="center" gap={2}>
        <Text fontSize="xl" fontWeight="bold">{equipo2?.nombre}</Text>
        <Image bg="red.500" src={equipo2?.logo} rounded="full" w={8} h={8} alt='logo equipo'/>

      </Flex>
    </Flex>
  );
}

export default Header