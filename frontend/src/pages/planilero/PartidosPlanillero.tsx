import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { MatchCard } from './components/partidos/MatchCard';
import { useEffect, useState } from 'react';
import { PartidoType } from '../../interfaces/marcador';
import useStore from '../../store/store';
import instance from '../../api/axios';



export function PartidosPlanillero() {
    const [partidos, setPartidos] = useState<PartidoType[]>([]);
    const user = useStore( (state)=> state.user)
    // const navigate = useNavigate();
     
    useEffect(() => {
      const getPartidos = async () => {
         const response = await instance.get(`/partidos/planillero/${user?.id}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asume que el token está almacenado en localStorage
          },
         })
         console.log(response,"response partidos")
         setPartidos(response.data)
      }
      getPartidos()
    }, [])
  return (
    <Box p={6}>
    <Text fontSize="2xl" fontWeight="bold" mb={4}>
      Partidos
    </Text>
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
      {
       partidos.length > 0 ? 
      partidos.map((match, index) => (
        <MatchCard key={index} {...match} />
      ))
      : <Text> No tiene partidos asignados</Text>
    }
    </SimpleGrid>
  </Box>
  );
}
