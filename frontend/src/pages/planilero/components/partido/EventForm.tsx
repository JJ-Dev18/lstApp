import {  FormControl, FormLabel,Select as ChakraSelect, Button, Text, Textarea, Card, Theme, useColorMode } from '@chakra-ui/react';
import { Equipo } from '../../../../interfaces/marcador';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import instance from '../../../../api/axios';
import { useTheme } from '@emotion/react';
import customStyles from '../../../../theme/reactSelectStyles';

interface EventFormProps {
    selectedEvent: string;
    team1?: Equipo;
    team2?: Equipo;
    handleSubmit : ( player: number, comment: string, event: string) => void
    
  }
  interface Player {
    value: string;
    label: string;
  }
  const fetchPlayers = async (equipoId: string): Promise<Player[]> => {
    const response = await instance.get(`/jugadores/equipo/${equipoId}`);
   
    return response.data.map((player: any) => ({ value: player.id.toString(), label: player.nombre }));
  };
export function EventForm({ selectedEvent,team1,team2,handleSubmit}: EventFormProps) {
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [selectedPlayer, setSelectedPlayer] = useState<{ value: string; label: string } | null>(null);
    const [selectedAssistPlayer, setSelectedAssistPlayer] = useState<Player | null>(null);
    const [comment,  setcomment]   = useState('')
    const { data: teamPlayers = [], refetch } = useQuery({
        queryKey :  ['players', selectedTeam],
        queryFn : () => fetchPlayers(selectedTeam),
        enabled : selectedTeam!= '' 
    })
    const theme = useTheme() as Theme;
    const { colorMode } = useColorMode();
    const styles = customStyles(theme, colorMode);

  
    const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const team = e.target.value;
      console.log(team)
      setSelectedTeam(team);
      setSelectedPlayer(null);
      setSelectedAssistPlayer(null);
      if (team) {
        refetch();
      }
    };
  return (
    <Card  p={4} rounded="lg" shadow="md" mt={4}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>{selectedEvent}</Text>
      <FormControl id="team" mb={4}>
        <FormLabel>Equipo</FormLabel>
        <ChakraSelect placeholder="Seleccionar equipo" onChange={handleTeamChange}>
          <option value={team1?.id}>{team1?.nombre}</option>
          <option value={team2?.id}>{team2?.nombre}</option>
        </ChakraSelect>
      </FormControl>
      <FormControl id="player" mb={4}>
        <FormLabel>Jugador</FormLabel>
        <Select
          styles={styles}
          value={selectedPlayer}
          onChange={(option) => setSelectedPlayer(option as Player)}
          options={teamPlayers}
          placeholder="Ingresar nombre del goleador"
        />
      </FormControl>
      {selectedEvent === 'gol' && (
        <FormControl id="assistPlayer" mb={4}>
          <FormLabel>Asitencia</FormLabel>
          <Select
            styles={styles}
            value={selectedAssistPlayer}
            onChange={(option) => setSelectedAssistPlayer(option as Player)}
            options={teamPlayers}
            placeholder="Ingresar nombre del asistidor"
          />
        </FormControl>
      )}
      <FormControl id="scorer" mb={4}>
        <FormLabel>Comentario</FormLabel>
        <Textarea value={comment} onChange={(e)=> setcomment( e.target.value)} placeholder="Ingresar algun comentario" />
      </FormControl>
      <Button colorScheme="blackAlpha" width="full" onClick={
        ()=> {
          if(selectedEvent == 'gol'){
            handleSubmit(Number(selectedAssistPlayer?.value),comment,'asistencia')            
            handleSubmit(Number(selectedPlayer?.value),comment,selectedEvent)
          }else{
            handleSubmit(Number(selectedPlayer?.value),comment,selectedEvent)

          }
        } 
      }>Guardar Evento</Button>
    </Card>
  );
}
