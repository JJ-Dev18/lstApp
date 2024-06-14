import React , { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Heading, VStack, useToast, Button,Card, Modal, ModalOverlay, ModalContent, ModalHeader, Text, ModalFooter, ModalBody, ModalCloseButton, Input, IconButton } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { asociarEquipoGrupo, createGrupo, deleteGrupo, fetchGrupos } from '../../../../api/admin/grupos';
import { DeleteIcon } from '@chakra-ui/icons';
import { Progress } from '@chakra-ui/react';
import { EquiposGrupo, GruposEquipo } from '../../../../interfaces/grupos';
import { Equipo } from '../../../../interfaces/marcador';
import { fetchEquiposDisponibles } from '../../../../api/admin/equipos';




interface DragDropContextComponentProps {
  categoryId: number;
}




const DragDropContextComponent: React.FC<DragDropContextComponentProps> = ({ categoryId }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const { data: equipos,  isLoading: equiposLoading  } = useQuery({
    queryKey: ["equiposDisponibles", categoryId],
    queryFn: () => fetchEquiposDisponibles(categoryId),
  });
  const { data: grupos, isLoading : gruposLoading , } = useQuery({
    queryKey: ["grupos", categoryId],
    queryFn: () => fetchGrupos(categoryId.toString()),
  });
  const associateTeamMutation = useMutation(
   
    {
      mutationFn : ({ equipoId, sourceGroupId, destinationGroupId }: { equipoId: number; sourceGroupId?: number; destinationGroupId: number | null}) => asociarEquipoGrupo( {equipoId, sourceGroupId, destinationGroupId}),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['equiposDisponibles', categoryId]});
        queryClient.invalidateQueries({queryKey: ['grupos', categoryId]});
        toast({
          title: 'Equipo asociado al grupo correctamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      
    }
  );
  const createGroupMutation = useMutation(
    {
      mutationFn : ({newGroupName, categoriaId}:{ newGroupName : string, categoriaId : number}) =>  createGrupo(categoriaId,newGroupName),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['grupos', categoryId]});
        toast({
          title: 'Grupo creado correctamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setNewGroupName('');
        setIsModalOpen(false);
      },
     
    }
  );

  const deleteGroupMutation = useMutation(
    {
       mutationFn : deleteGrupo,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey : ['grupos', categoryId]});
        toast({
          title: 'Grupo eliminado correctamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
     
    }
  );

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    console.log(destination,"destination")
    if (source.droppableId !== destination.droppableId) {
      // Moving between groups
      const equipoId = Number(result.draggableId);
      const sourceGroupId = source.droppableId !== 'equiposDisponibles' ? Number(source.droppableId) : undefined;
      const destinationGroupId = destination.droppableId !== 'equiposDisponibles' ? Number(destination.droppableId) : null;
      if (destinationGroupId === undefined) {
        // Mover de un grupo a la lista de equipos disponibles
        associateTeamMutation.mutate({ equipoId, sourceGroupId, destinationGroupId: null });
      } else {
        // Mover entre grupos
        associateTeamMutation.mutate({ equipoId, sourceGroupId, destinationGroupId });
      }
    }
  };
  const handleDeleteGroup = (groupId: number) => {
    const grupo  = grupos.find((g: GruposEquipo) => g.id === groupId);
    if (grupo && grupo.equiposGrupos?.length > 0) {
      toast({
        title: 'Error',
        description: 'No se puede eliminar un grupo con equipos asociados.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    deleteGroupMutation.mutate(groupId);
  };
  if (equiposLoading || gruposLoading) return <Progress/>;

  return (
  <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Box  display={{ base: 'block', md: 'flex' }} flexDirection={{ base: 'column', md: 'row' }}>
        <Droppable droppableId="equiposDisponibles">
          {(provided) => (
            <Card {...provided.droppableProps} ref={provided.innerRef} p={4}  w={{ base: '100%', md: '30%' }} mb={{ base: 4, md: 0 }} mr={{ md: 4 }}>
              <Heading as="h3" size="md" mb={4}>
                Equipos Disponibles
              </Heading>
              <VStack spacing={2}>
                {equipos.map((equipo: Equipo, index: number) => (
                  <Draggable key={equipo.id} draggableId={equipo.id.toString()} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        p={2}
                       
                        borderRadius="md"
                        borderWidth="1px"
                        w="100%"
                      >
                        {equipo.nombre}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </VStack>
            </Card>
          )}
        </Droppable>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between"  w={{ base: '100%', md: '80%' }}>
          {
          (grupos.length === 0)  ? <Text> No hay grupos creados </Text>
           : 
       
          grupos?.map((grupo: GruposEquipo) => (
            <Droppable key={grupo.id} droppableId={grupo.id.toString()}>
              {(provided) => (
                <Card
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  p={4}
                  w={{ base: '100%', md: '45%' }}
                  mb={{ base: 4, md: 4 }}
                  borderRadius="md"
                 
                  // m={2}
                >
                  <Heading as="h3" size="md" mb={4}>
                    {grupo.nombre}
                  </Heading>
                  <IconButton
                        aria-label="Eliminar grupo"
                        icon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        position="absolute"
                        top={0}
                        right={0}
                        colorScheme="red"
                        onClick={() => handleDeleteGroup(grupo.id)}
                      />
                  <VStack spacing={2}>
                    {grupo.equiposGrupos?.map((equipo: EquiposGrupo, index: number) => (
                      <Draggable key={equipo.equipo.id} draggableId={equipo.equipo.id.toString()} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            p={2}
                         
                            borderRadius="md"
                            borderWidth="1px"
                            w="100%"
                          >
                            {equipo.equipo.nombre}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                </Card>
              )}
            </Droppable>
          ))}
        </Box>
      </Box>
    </DragDropContext>
    <Button
        position="fixed"
        bottom={4}
        right={4}
        colorScheme="teal"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Grupo
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Grupo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Nombre del grupo"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => createGroupMutation.mutate({categoriaId:  categoryId,newGroupName})}>
              Agregar
            </Button>
            <Button ml={3} onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
  )
  
};

export default DragDropContextComponent;
