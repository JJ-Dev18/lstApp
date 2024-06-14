import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, Box, Flex, Heading, Text, Input, Button, VStack, InputGroup, InputLeftElement, Skeleton } from '@chakra-ui/react';
import { EmailIcon, LockIcon, InfoIcon } from '@chakra-ui/icons';
import { BorderBeam } from '../../components/ui/BorderBeam'; // Asegúrate de tener este componente
import useStore from '../../store/store';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const register = useStore( (state) => state.register)
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/login/login.webp';
    img.onload = () => setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a tu API
    console.log({ nombre, email, password });
    try {
      // Simula una llamada a la API de registro
      await register(email,password,nombre)
      toast({
        title: 'Registro exitoso',
        description: 'Tu cuenta ha sido creada exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error: any) {
      console.log(error,"error")
      toast({
        title: 'Error en el registro',
        description: error.message || 'No se pudo crear la cuenta.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center" p={4}>
      <Skeleton isLoaded={!loading} width="100%" height="100vh" position="absolute">
        <Box
          backgroundImage="url('/assets/login/login.webp')"
          backgroundSize="cover"
          backgroundPosition="center"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
        />
      </Skeleton>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background='rgba(44, 62, 80, 0.7)'
      />
      <Flex
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
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading mb={4} textAlign="center" color="teal.300" fontSize="2xl" fontWeight="bold">
          Crea tu cuenta
        </Heading>
        <Text mb={6} textAlign="center" color="white" fontSize="md">
          Regístrate para acceder a la plataforma
        </Text>
        <BorderBeam duration={3} />
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<InfoIcon color="gray.300" />} />
              <Input
                placeholder="Nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                bg="rgba(255, 255, 255, 0.2)"
                variant="filled"
                _hover={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                _focus={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                border="1px solid rgba(255, 255, 255, 0.5)"
                color="white"
                required
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.300" />} />
              <Input
                placeholder="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgba(255, 255, 255, 0.2)"
                variant="filled"
                _hover={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                _focus={{ bg: 'rgba(255, 255, 255, 0.3)' }}
                border="1px solid rgba(255, 255, 255, 0.5)"
                color="white"
                required
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
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
                required
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
              Registrarse
            </Button>
          </VStack>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
