import React  from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { fetchGrupos } from '../../../../api/admin/grupos';
import TablaDePosiciones from './TablaPosiciones';
import { useQuery } from '@tanstack/react-query';
import { GruposEquipo } from '../../../../interfaces/grupos';

interface Props {
  categoriaId: number;
}

const GrupoTabs: React.FC<Props> = ({ categoriaId }) => {

  const { data: grupos, isLoading , isError } = useQuery({
    queryKey: ["grupos", categoriaId],
    queryFn: () => fetchGrupos(categoriaId.toString()),
  });
 

  return (
    <Tabs>
      <TabList>
        { grupos && grupos?.length > 0 ? 
        grupos?.map((grupo:GruposEquipo) => (
          <Tab key={grupo.id}>{grupo.nombre}</Tab>
        ))
       : <p>No hay grupos creados</p>
    }
      </TabList>
      <TabPanels>
        {grupos?.map((grupo:GruposEquipo) => (
          <TabPanel key={grupo.id}>
            <TablaDePosiciones grupoId={grupo.id} categoriaId={categoriaId} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default GrupoTabs;
