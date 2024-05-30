import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Alert, useToast, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import useStore from '../../store/store';

export interface Alert {
  visible : boolean;
  message : string 
}
const Login: React.FC = () => {
  const [username, setUsername] = useState('planillero1@example.com');
  const [password, setPassword] = useState('planillero123');
  const { login : dispatchLogin, token , user } = useStore((state) => state);

  
  const toast = useToast()
  const {colorMode} = useColorMode()
  const formWidth = useBreakpointValue({ base: '90%', md: '400px' });
  const navigate = useNavigate();
 

  useEffect(() => {
    if (token) {
      console.log('hay token')
      switch (user?.rol) {
        case 'administrador':
          navigate('/admin/dashboard');
          break;
        case 'planillero':
          navigate('/planillero');
          break;
        case 'espectador':
          navigate('/espectador');
          break;
        default:
          navigate('/public');
          break;
      }
    }
    
  }, [token]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
      try {
       const user =  await dispatchLogin(username,password);
       switch (user?.rol) {
        case 'administrador':
          navigate('/admin/dashboard');
          break;
        case 'planillero':
          navigate('/planillero');
          break;
        case 'espectador':
          navigate('/espectador');
          break;
        default:
          navigate('/public');
          break;
      }
      } catch (error:any) {
        console.log(error)
        toast({
          title: 'Login failed',
          description: error.message || 'Invalid username or password.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }

  
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minH="100vh"  py={6}>
    <Box w={formWidth} p={6} boxShadow="lg" bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} borderRadius="md">
      <Heading mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  </Box>
  );
};

export default Login;
