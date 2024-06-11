import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../../../../api/axios';
import useStore from '../../../../store/store';


type FormValues = {
  nombre: string;
  numEquipos: number;
  numCategorias: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTournamentForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      nombre: 'prueba torneo',
      numCategorias: 2,
      numEquipos: 2,
    }
  });

  const user = useStore((state) => state.user);
  const setOpenForm = useStore((state) => state.setOpenForm);
  const toast = useToast();
  const queryClient = useQueryClient();

  const createTournament = async (data: FormValues) => {
    await instance.post(`/torneos/${user?.id}`, data);
  };

  const mutation = useMutation( {
    mutationFn : createTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey : ['torneos', user?.id]});
      toast({
        title: 'Torneo creado con éxito.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setOpenForm(false);
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: 'Error al crear el torneo.',
        description: error.response?.data?.error || 'Hubo un problema al crear el torneo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Torneo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl id="nombre" isInvalid={!!errors.nombre}>
                  <FormLabel>Nombre del Torneo</FormLabel>
                  <Input
                    type="text"
                    {...register('nombre', { required: 'Nombre es requerido' })}
                  />
                  {errors.nombre && <p>{errors.nombre.message}</p>}
                </FormControl>
                <FormControl id="numEquipos" isInvalid={!!errors.numEquipos}>
                  <FormLabel>Número de Equipos</FormLabel>
                  <NumberInput min={2}>
                    <NumberInputField
                      {...register('numEquipos', {
                        required: 'Número de equipos es requerido',
                        valueAsNumber: true,
                        min: 2,
                      })}
                    />
                  </NumberInput>
                  {errors.numEquipos && <p>{errors.numEquipos.message}</p>}
                </FormControl>
                
                
                <FormControl id="numCategorias" isInvalid={!!errors.numCategorias}>
                  <FormLabel>Número de Categorías</FormLabel>
                  <NumberInput min={1}>
                    <NumberInputField
                      {...register('numCategorias', {
                        required: 'Número de categorías es requerido',
                        valueAsNumber: true,
                        min: 1,
                      })}
                    />
                  </NumberInput>
                  {errors.numCategorias && <p>{errors.numCategorias.message}</p>}
                </FormControl>
                <Button id="torneoSubmit" type="submit" colorScheme="teal" width="full" isLoading={mutation.isPending}>
                  Crear Torneo
                </Button>
              </VStack>
            </form>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTournamentForm;
