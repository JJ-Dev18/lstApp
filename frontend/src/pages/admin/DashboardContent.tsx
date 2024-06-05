import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Spinner,
  SimpleGrid,

} from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    tournaments: 0,
    players: 0,
    matches: 0,
    teams: 0,
    stats: {
      totalGoals: 0,
      averageGoalsPerMatch: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de llamada a API para obtener datos del dashboard
    setTimeout(() => {
      const fetchedData = {
        tournaments: 5,
        players: 120,
        matches: 45,
        teams: 10,
        stats: {
          totalGoals: 230,
          averageGoalsPerMatch: 5.1,
        },
      };
      setData(fetchedData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Dashboard</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="8" mb={8}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stat>
            <StatLabel>Total de Torneos</StatLabel>
            <StatNumber>{data.tournaments}</StatNumber>
            <StatHelpText>Actualizado recientemente</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stat>
            <StatLabel>Total de Jugadores</StatLabel>
            <StatNumber>{data.players}</StatNumber>
            <StatHelpText>Actualizado recientemente</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stat>
            <StatLabel>Total de Partidos</StatLabel>
            <StatNumber>{data.matches}</StatNumber>
            <StatHelpText>Actualizado recientemente</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stat>
            <StatLabel>Total de Equipos</StatLabel>
            <StatNumber>{data.teams}</StatNumber>
            <StatHelpText>Actualizado recientemente</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>
      <Heading as="h2" size="lg" mb={4}>Estadísticas</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="8">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stat>
            <StatLabel>Total de Goles</StatLabel>
            <StatNumber>{data.stats.totalGoals}</StatNumber>
            <StatHelpText>Actualizado recientemente</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stat>
            <StatLabel>Promedio de Goles por Partido</StatLabel>
            <StatNumber>{data.stats.averageGoalsPerMatch}</StatNumber>
            <StatHelpText>Actualizado recientemente</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
