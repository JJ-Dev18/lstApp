import React from 'react';
import { Box, SimpleGrid, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import ResponsiveTable from './components/ResponsiveTable';
import MatchesChart from './components/MatchesChart';

// const partidosData = [
//   { fecha: "22/06/2022", equipo1: "Equipo A", equipo2: "Equipo B", grupo: "Grupo A" },
//   { fecha: "23/06/2022", equipo1: "Equipo C", equipo2: "Equipo D", grupo: "Grupo B" },
//   { fecha: "24/06/2022", equipo1: "Equipo E", equipo2: "Equipo F", grupo: "Grupo C" },
//   { fecha: "25/06/2022", equipo1: "Equipo G", equipo2: "Equipo H", grupo: "Grupo D" },
//   { fecha: "26/06/2022", equipo1: "Equipo I", equipo2: "Equipo J", grupo: "Grupo E" },
// ];

const gruposData = [
  { nombre: "Grupo A", partidos: 6, equipos: 4 },
  { nombre: "Grupo B", partidos: 6, equipos: 4 },
  { nombre: "Grupo C", partidos: 6, equipos: 4 },
];

// const equiposData = [
//   { nombre: "Team 1", grupo: "A", jugados: 3, ganados: 2, empatados: 0, perdidos: 1, golesFavor: 5 },
//   { nombre: "Team 2", grupo: "B", jugados: 3, ganados: 1, empatados: 1, perdidos: 1, golesFavor: 4 },
//   { nombre: "Team 3", grupo: "C", jugados: 3, ganados: 0, empatados: 2, perdidos: 1, golesFavor: 2 },
//   { nombre: "Team 4", grupo: "D", jugados: 3, ganados: 3, empatados: 0, perdidos: 0, golesFavor: 7 },
//   { nombre: "Team 5", grupo: "E", jugados: 3, ganados: 1, empatados: 2, perdidos: 0, golesFavor: 5 },
// ];

// const partidosColumns = [
//   { Header: 'Fecha', accessor: 'fecha' },
//   { Header: 'Equipo 1', accessor: 'equipo1' },
//   { Header: 'Equipo 2', accessor: 'equipo2' },
//   { Header: 'Grupo', accessor: 'grupo' },
// ];

const gruposColumns = [
  { Header: 'Nombre', accessor: 'nombre' },
  { Header: 'Partidos', accessor: 'partidos' },
  { Header: 'Equipos', accessor: 'equipos' },
];

// const equiposColumns = [
//   { Header: 'Nombre', accessor: 'nombre' },
//   { Header: 'Grupo', accessor: 'grupo' },
//   { Header: 'Jugados', accessor: 'jugados' },
//   { Header: 'Ganados', accessor: 'ganados' },
//   { Header: 'Empatados', accessor: 'empatados' },
//   { Header: 'Perdidos', accessor: 'perdidos' },
//   { Header: 'Goles a favor', accessor: 'golesFavor' },
// ];

const DashboardContent: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={4}>
        Resumen
      </Heading>
      <Text fontSize="2xl" fontWeight="bold">Welcome to your dashboard</Text>
        <Text mb="4">You have 2 teams, 12 matches and 24 players. Need help? Check out the help center.</Text>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={8}>
        <Box bg={useColorModeValue('gray.100', 'gray.800')} p={4} borderRadius="md" shadow="md">
          <Heading as="h3" size="lg">Partidos</Heading>
          <Text fontSize="2xl">24</Text>
        </Box>
        <Box bg={useColorModeValue('gray.100', 'gray.800')} p={4} borderRadius="md" shadow="md">
          <Heading as="h3" size="lg">Grupos</Heading>
          <Text fontSize="2xl">6</Text>
        </Box>
        <Box bg={useColorModeValue('gray.100', 'gray.800')} p={4} borderRadius="md" shadow="md">
          <Heading as="h3" size="lg">Equipos</Heading>
          <Text fontSize="2xl">12</Text>
        </Box>
        <Box bg={useColorModeValue('gray.100', 'gray.800')} p={4} borderRadius="md" shadow="md">
          <Heading as="h3" size="lg">Usuarios</Heading>
          <Text fontSize="2xl">200</Text>
        </Box>
      </SimpleGrid>
      <Box mb={8}>
        <Heading as="h3" size="lg" mb={4}>Partidos por dia</Heading>
        <MatchesChart/>
      </Box>
      <Box mb={8}>
        <Heading as="h3" size="lg" mb={4}>Grupos</Heading>
        <ResponsiveTable columns={gruposColumns} data={gruposData} />
      </Box>
      {/* <Box mb={8}>
        <Heading as="h3" size="lg" mb={4}>Partidos</Heading>
        <ResponsiveTable columns={partidosColumns} data={gruposData} />
      </Box>
      <Box mb={8}>
        <Heading as="h3" size="lg" mb={4}>Equipos</Heading>
        <ResponsiveTable columns={equiposColumns} data={equiposData} />
      </Box> */}
    </Box>
  );
};

export default DashboardContent;
