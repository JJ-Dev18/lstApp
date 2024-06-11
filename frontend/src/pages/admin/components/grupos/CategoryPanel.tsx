import React, { useState } from 'react';
import { Box, Button, Input, useToast, VStack } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createGrupo, fetchGrupos } from '../../../../api/admin/grupos';


interface Group {
  id: number;
  nombre: string;
}

interface CategoryPanelProps {
  categoryId: number;
}



const CategoryPanel: React.FC<CategoryPanelProps> = ({ categoryId }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [newGroupName, setNewGroupName] = useState('');

  const { data: grupos, isLoading , isError } = useQuery({
    queryKey: ["grupos", categoryId],
    queryFn: () => fetchGrupos(categoryId.toString()),
  });
  const addGroupMutation = useMutation(
    {
      mutationFn : ({
        categoriaId,
        nombre,
      }: {
        categoriaId: number ;
        nombre: string;
      }) =>  createGrupo(categoriaId,nombre),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey:['grupos', categoryId]});
        toast({
          title: 'Grupo añadido.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Error añadiendo grupo.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const handleAddGroup = () => {
    addGroupMutation.mutate({ categoriaId : categoryId, nombre : newGroupName} );
    setNewGroupName('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading groups</div>;

  return (
    <Box>
      <VStack align="stretch" spacing={4}>
        {grupos.map((group: Group) => (
          <Box key={group.id} className="p-4 border rounded-lg">
            <h2 className="text-lg font-bold">{group.nombre}</h2>
            {/* <TeamManager groupId={group.id} /> */}
          </Box>
        ))}
        <Box className="p-4 border rounded-lg">
          <Input
            placeholder="Nombre del nuevo grupo"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Button mt={2} onClick={handleAddGroup}>
            Agregar Grupo
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default CategoryPanel;
