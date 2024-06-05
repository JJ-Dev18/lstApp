import React from 'react';
import { Box, Heading, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Inicio: React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Panel de Administración</Heading>
      <ChakraLink as={Link} to="/admin/dashboard">
        <Button colorScheme="teal" mb={4}>Ir al Dashboard</Button>
      </ChakraLink>
      <ChakraLink as={Link} to="/admin/listarTorneos">
        <Button colorScheme="teal" mb={4}>Ver Torneos</Button>
      </ChakraLink>
    </Box>
  );
};

export default Inicio;
