import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, useDisclosure, Box } from '@chakra-ui/react';
import CrearPartidoModal from './CrearPartidoModal';
import PartidosTable from './PartidosTable';
import useStore from '../../../../store/store';
import { fetchCategorias } from '../../../../api/admin/categorias';
import { fetchPartidos } from '../../../../api/admin/partidos';
import {  fetchEquiposPorCategoria } from '../../../../api/admin/equipos';

// Funciones de fetch




const CrearPartido: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [selectedPartido, setSelectedPartido] = useState<any | null>(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const torneo = useStore((state) => state.torneo);
   console.log(categoriaSeleccionada,"scas")

  const { data: partidos } = useQuery({
    queryKey : ['partidos', torneo?.id],
    queryFn: () => fetchPartidos(torneo?.id)
  });
  
  const { data: categorias, isLoading: isLoadingCategorias } = useQuery({
    queryKey: ["categorias", torneo?.id],
    queryFn: () => fetchCategorias(torneo?.id.toString()),
  });
  const { data: equipos } = useQuery({
    queryKey: ["equipos", categoriaSeleccionada],
    enabled : !!categoriaSeleccionada,
    queryFn: () => fetchEquiposPorCategoria(categoriaSeleccionada?.toString()),
  });
  const handleCategoriaChange = (index: number) => {
    const categoria = categorias[index];
    setCategoriaSeleccionada(categoria.id);
    
  };
  const handleOnClose = () => {
    setSelectedPartido(null)
    onClose()
  }
  useEffect(() => {
    if(!isLoadingCategorias){
        if(categorias){
            setCategoriaSeleccionada(categorias.length > 0 ? categorias[0].id : 0)
        }
    }
  }, [isLoadingCategorias])
  
 
  return (
    <Box className="p-4">
      <Tabs  variant="soft-rounded"
        colorScheme="teal" onChange={handleCategoriaChange}>
        <TabList>
          {categorias?.map((categoria: any) => (
            <Tab key={categoria.id}>{categoria.nombre}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {categorias?.map((categoria: any) => (
            <TabPanel key={categoria.id}>
              <PartidosTable onOpen={onOpen} partidos={partidos} categoriaId={categoria.id} torneoId={torneo?.id}  setSelectPartido={setSelectedPartido}/>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      <Button
        onClick={onOpen}
        position="fixed"
        bottom="20px"
        right="20px"
        colorScheme="teal"
      >
        Crear Partido
      </Button>

      <CrearPartidoModal
        partido={selectedPartido}
        isOpen={isOpen}
        onClose={handleOnClose}
        equipos={equipos}
        categoriaId={categoriaSeleccionada!}
        torneoId={torneo?.id}  // Asume que torneoId es el mismo que categoriaSeleccionada por simplicidad
      />
    </Box>
  );
};

export default CrearPartido;
