import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Text, Box, useToast, IconButton, TableContainer } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePartido } from '../../../../api/admin/partidos';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Partido } from '../../../../interfaces/partido';

interface PartidosTableProps {
  partidos: any[];
  categoriaId: number;
  torneoId : number | undefined
   onOpen: () => void,
   setSelectPartido : React.Dispatch<React.SetStateAction<Partido>>
}

const PartidosTable: React.FC<PartidosTableProps> = ({setSelectPartido, onOpen,torneoId,partidos, categoriaId }) => {
  const partidosFiltrados = partidos?.filter((partido: Partido) => partido.categoriaId === categoriaId);
  const toast = useToast()
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
   
    {
      mutationFn : deletePartido,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['partidos',torneoId]});
        toast({
            title: 'Partido Eliminado correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: 'Error al eliminar partido.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
    }
  );

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (partido:Partido) => {
    setSelectPartido(partido);
    onOpen();
  };

  return (
    <Box overflowX="auto">
        <TableContainer>

    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Equipo 1</Th>
          <Th>Equipo 2</Th>
          <Th>Fecha</Th>
          <Th>Duración</Th>
          <Th>Estado</Th>
          <Th>Planillero</Th>

          
        </Tr>
      </Thead>
      <Tbody>
        {partidos && partidosFiltrados.length > 0 ? (
          partidosFiltrados.map((partido: Partido) => (
            <Tr key={partido.id}>
              <Td>{partido.id}</Td>
              <Td>{partido.equipo1.nombre}</Td>
              <Td>{partido.equipo2.nombre}</Td>
              <Td>{new Date(partido.fecha).toLocaleString()}</Td>
              <Td>{partido.duracion}</Td>
              <Td>{partido.estado}</Td>
              <Td>{partido.planillero?.usuario.nombre || 'No asignado'}</Td>
            <Td display="flex">
            <IconButton
                    aria-label="Editar"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(partido)}
                    mr="2"
                  />
                  <IconButton
                    aria-label="Eliminar"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(partido.id)}
                  />
            </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={6}>
              <Text align="center">No hay partidos en esta categoría</Text>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
        </TableContainer>
    </Box>
  );
};

export default PartidosTable;
