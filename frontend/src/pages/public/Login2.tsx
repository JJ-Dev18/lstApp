import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useToast } from '@chakra-ui/react';
import useStore from '../../store/store';
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { BorderBeam } from '../../components/ui/BorderBeam';
const Login2 = () => {
  // const overlayColor = useColorModeValue('rgba(44, 62, 80, 0.7)', 'rgba(255, 255, 255, 0.7)');
  const [username, setUsername] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const { login : dispatchLogin, token , user } = useStore((state) => state);

  
  const toast = useToast()
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
          navigate('/inicio');
          break;
      }
    }
    
  }, [token]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
      try {
       const user =  await dispatchLogin(username,password);
       console.log(user,"user handle")
      //  switch (user?.rol) {
      //   case 'administrador':
      //     navigate('/admin/dashboard');
      //     break;
      //   case 'planillero':
      //     navigate('/planillero');
      //     break;
      //   case 'espectador':
      //     navigate('/espectador');
      //     break;
      //   default:
      //     navigate('/inicio');
      //     break;
      // }
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
    
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundImage="url('/assets/login/login.webp')"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        p={4}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          background='rgba(44, 62, 80, 0.7)'
        />
        <Box
          zIndex="1"
          maxW={{ base: '90%', md: 'md' }}
          w="full"
          p={8}
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0 0 20px rgba(0, 0, 0, 0.5)"
          borderRadius="lg"
          border="1px solid rgba(255, 255, 255, 0.5)"
          backdropFilter="blur(10px)"
          position="relative"
          overflow="hidden"
        >
          <Heading mb={4} textAlign="center" color="teal.300" fontSize="2xl" fontWeight="bold">
            Bienvenido de vuelta
          </Heading>
          <Text mb={6} textAlign="center" color="white" fontSize="md">
            Inicia sesión para acceder a tu cuenta
          </Text>
          <BorderBeam duration={3}/>
          <form onSubmit={handleSubmit}>

          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<EmailIcon color="gray.300" />}
              />
              <Input
                placeholder="Usuario"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                bg="rgba(255, 255, 255, 0.2)"
                variant="filled"
                _hover={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                _focus={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                border="1px solid rgba(255, 255, 255, 0.5)"
                color="white"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.300" />}
              />
              <Input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="rgba(255, 255, 255, 0.2)"
                variant="filled"
                _hover={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                _focus={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                border="1px solid rgba(255, 255, 255, 0.5)"
                color="white"
              />
            </InputGroup>
            <Button
              colorScheme="teal"
              variant="solid"
              width="full"
              bg="teal.400"
              type='submit'
              _hover={{ bg: 'teal.500' }}
              boxShadow="0 0 10px teal"
            >
              Iniciar sesión
            </Button>
          </VStack>
          </form>
        </Box>
      </Flex>
    
  );
};

export default Login2;
