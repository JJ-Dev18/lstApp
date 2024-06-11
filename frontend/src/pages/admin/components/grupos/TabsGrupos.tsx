import React from 'react';
import {  Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { fetchCategorias } from '../../../../api/admin/categorias';
import useStore from '../../../../store/store';
import { useQuery} from "@tanstack/react-query";
import CategoryPanel2 from './CategoryPanel2';




const TabsGrupos: React.FC = () => {
    const torneo = useStore((state) => state.torneo);
    // Supongamos que tenemos el ID del torneo
  const { data: categorias, isLoading: isLoadingCategorias, isError } = useQuery({
    queryKey: ["categorias", torneo?.id],
    queryFn: () => fetchCategorias(torneo?.id.toString()),
  });

  if (isLoadingCategorias) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  return (
   
        <Box className="p-4">
          <Tabs variant="soft-rounded"
           colorScheme="teal" >
            <TabList>
              {categorias.map((categoria: any) => (
                <Tab key={categoria.id}>{categoria.nombre}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {categorias.map((categoria: any) => (
                <TabPanel key={categoria.id}>
                  <CategoryPanel2 categoryId={categoria.id} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
     
  );
};

export default TabsGrupos;
