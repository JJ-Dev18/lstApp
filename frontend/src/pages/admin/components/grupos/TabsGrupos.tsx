import React from 'react';
import {  Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import CategoryPanel2 from './CategoryPanel2';
import { useCategorias } from '../../../../hooks/useCategorias';
import { Progress } from '@chakra-ui/react';




const TabsGrupos: React.FC = () => {
    // Supongamos que tenemos el ID del torneo
  const { categorias,  isLoadingCategorias, isError } = useCategorias();

  if (isLoadingCategorias) return <Progress/>;
  if (isError) return <div>Error loading categories</div>;

  return (
   
        <Box className="p-4">
          <Tabs variant="soft-rounded"
           colorScheme="teal" >
            <TabList>
              {categorias?.map((categoria: any) => (
                <Tab key={categoria.id}>{categoria.nombre}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {categorias?.map((categoria: any) => (
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
