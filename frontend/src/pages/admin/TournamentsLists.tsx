import React, { useEffect, useState } from 'react';
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
  useColorModeValue,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { SearchIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../../store/store';
import { TorneoSelected } from '../../store/slices/TorneoSlice';
import UpdateTournamentModal from './components/torneos/UpdateTournamentModal';
import { deleteTournament, fetchTorneos } from '../../api/admin/torneos';
import { IoAddOutline } from 'react-icons/io5';



const TournamentsList: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);
  const setTorneo = useStore((state) => state.setTorneo);
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const torneo = useStore((state) => state.torneo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTournamentId, setCurrentTournamentId] = useState<number | null>(null);
  const [currentTournamentName, setCurrentTournamentName] = useState<string>('');
  const [selectedTournament, setSelectedTournament] = useState<TorneoSelected | null>(torneo);
  const [filter, setFilter] = useState<string>('');
  const setOpenform= useStore( (state) => state.setOpenForm)

  const { data: tournaments, isLoading, isError } = useQuery({
    queryKey: ['torneos', user?.id],
    queryFn: () => fetchTorneos(user?.id),
    enabled: !!user?.id,
    // staleTime: 600000,
  });

  
  const deleteMutation = useMutation({
    mutationFn: deleteTournament,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey : ['torneos', user?.id]});
     
      toast({
        title: 'Torneo eliminado con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    
  });

  useEffect(() => {
    setSelectedTournament(torneo);
  }, [torneo]);

  const handleSelectTournament = (tournament: TorneoSelected) => {
    setSelectedTournament(tournament);
    setTorneo(tournament);
    toast({
      title: `Torneo ${tournament.nombre} seleccionado`,
      description: `Has seleccionado el torneo ${tournament.nombre}`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  const handleDeleteTournament = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleEditTournament = (tournament: TorneoSelected) => {
    setCurrentTournamentId(tournament.id);
    setCurrentTournamentName(tournament.nombre);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredTournaments = tournaments?.filter((tournament: TorneoSelected) => {
    const searchTerm = filter.toLowerCase();
    return (
      tournament.nombre.toLowerCase().includes(searchTerm) ||
      (tournament.categorias?.toString().toLowerCase().includes(searchTerm) ?? false) ||
      (tournament.equipos?.toString().toLowerCase().includes(searchTerm) ?? false) ||
      (tournament.jugadores?.toString().toLowerCase().includes(searchTerm) ?? false)
    );
  });

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text>Error al cargar los torneos</Text>
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Lista de Torneos
      </Heading>
      <Button 
            size={{base :'md', md : 'lg'}}
             onClick={() => setOpenform(true)}
             mb={2}
             id="btn-crear" aria-label="crear torneo"  position={{ base : 'static', lg : 'fixed'}} bottom={5} left={8}>
              <IoAddOutline /> Crear Torneo 
             </Button>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
        <Input
          type="text"
          placeholder="Buscar torneo"
          value={filter}
          onChange={handleFilterChange}
        />
      </InputGroup>
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
        {filteredTournaments?.map((tournament: TorneoSelected, index: number) => (
          <ListItem key={tournament.id} bg={bgColor} p={3} shadow="md" borderWidth="1px" borderRadius="md">
            <Flex flexDirection={{base:'column'}} justifyContent="space-between" alignItems="center">
              <Box color={textColor}>
                <Text fontWeight="bold">{tournament.nombre}</Text>
                <Text>Número de equipos: {tournament.equipos}</Text>
                <Text>Número de jugadores: {tournament.jugadores}</Text>
                <Text>Número de categorías: {tournament.categorias}</Text>
              </Box>
              <Flex mt={2}>
                <Button
                  id={`select-${index}`}
                  mr={2}
                  onClick={() => handleSelectTournament(tournament)}
                >
                  Seleccionar
                </Button>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon />}
                  onClick={() => handleEditTournament(tournament)}
                  mr={2}
                />
                <IconButton
                  aria-label="Eliminar"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteTournament(tournament.id)}
                />
              </Flex>
            </Flex>
          </ListItem>
        ))}
        {currentTournamentId !== null && (
          <UpdateTournamentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            tournamentId={currentTournamentId}
            currentName={currentTournamentName}
          />
        )}
      </List>
    </Box>
  );
};

export default TournamentsList;
