import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Text
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../../../../api/axios';

interface UpdateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentId: number;
  currentName: string;
}

type FormValues = {
  name: string;
};

const updateTournament = async (data: { id: number; name: string }) => {
  await instance.put(`/torneos/${data.id}`, { nombre: data.name });
};

const UpdateTournamentModal: React.FC<UpdateTournamentModalProps> = ({
  isOpen,
  onClose,
  tournamentId,
  currentName,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { name: currentName }
  });
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation( {
    mutationFn : updateTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey : ['torneos']});
      toast({
        title: 'Torneo actualizado con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: 'Error al actualizar el torneo.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ id: tournamentId, name: data.name });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Actualizar Torneo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Nombre del Torneo</FormLabel>
              <Input
                type="text"
                {...register('name', { required: 'Este campo es requerido' })}
              />
              {errors.name && <Text color="red.500">{errors.name.message}</Text>}
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit" >
              Actualizar
            </Button>
          </form>
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

export default UpdateTournamentModal;
