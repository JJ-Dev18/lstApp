import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  Flex,
  Spinner,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import instance from '../../api/axios';
import useStore from '../../store/store';
import { TorneoSelected } from '../../store/slices/TorneoSlice';



const TournamentsList: React.FC = () => {
  const [tournaments, setTournaments] = useState<TorneoSelected[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState<TorneoSelected | null>(null);
  const toast = useToast();
  const user = useStore( (state) => state.user)
  const setTorneo = useStore( (state) => state.setTorneo)
  const bgColor = useColorModeValue('white', 'gray.700'); // Cambia el color de fondo según el modo
  const textColor = useColorModeValue('gray.800', 'white'); 
  const torneo = useStore((state) => state.torneo)

  useEffect(() => {
    console.log(torneo,'cambio el torneo ')
    setSelectedTournament(torneo)
  }, [torneo])
  
  useEffect(() => {
    // Simulación de llamada a API para obtener torneos
    const getTorneos = async () => {
      const response = await instance.get(`/torneos/${user?.id}`)
      setTournaments(response.data)
      setLoading(false);
    }
    getTorneos()
  }, []);

  const handleSelectTournament = (tournament:TorneoSelected ) => {
    setSelectedTournament(tournament);
    setTorneo(tournament)
    toast({
      title: `Torneo ${tournament.nombre} seleccionado`,
      description: `Has seleccionado el torneo ${tournament.nombre}`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Lista de Torneos
      </Heading>
      {selectedTournament ? (
        <Box mb={4}>
          <Text>
            <strong>Torneo seleccionado:</strong> {selectedTournament.nombre}
          </Text>
        </Box>
      ) : (
        <Text mb={4}>No se ha seleccionado ningún torneo.</Text>
      )}
      <List spacing={3}>
        {tournaments.map((tournament,index) => (
          <ListItem  key={tournament.id}   bg={bgColor} p={3} shadow="md" borderWidth="1px" borderRadius="md">
            <Flex justifyContent="space-between" alignItems="center">
              <Box  color={textColor}>
                <Text fontWeight="bold">{tournament.nombre}</Text>
                <Text>Número de equipos: {tournament.equipos}</Text>
                <Text>Número de jugadores: {tournament.jugadores}</Text>
                <Text>Número de categorías: {tournament.categorias}</Text>
              </Box>
              <Button id={`select-${index}`}colorScheme="teal" onClick={() => handleSelectTournament(tournament)}>
                Seleccionar
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TournamentsList;
