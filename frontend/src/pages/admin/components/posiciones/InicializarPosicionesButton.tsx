import React from 'react';
import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import useStore from '../../../../store/store';
import instance from '../../../../api/axios';

const inicializarPosiciones = async (torneoId : number | undefined) => {
  const response = await instance.post(`/posiciones/iniciar/${torneoId}`);
  return response.data;
};

const InicializarPosicionesButton: React.FC = () => {
  const toast = useToast();
  const torneo = useStore( (state ) => state.torneo)
  const mutation = useMutation( {
    mutationFn: () => inicializarPosiciones(torneo?.id),
    onSuccess: () => {
      toast({
        title: 'Posiciones inicializadas.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error inicializando posiciones.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} colorScheme="blue">
      Inicializar Posiciones
    </Button>
  );
};

export default InicializarPosicionesButton;
