import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';

import { useCategorias } from '../../../../hooks/useCategorias';
import { Categoria } from '../../../../interfaces/marcador';
import GrupoTabs from './GruposTabs';
import TablaGeneral from './TablaGeneral';

interface Props {
 
}

const CategoriaTabs: React.FC<Props> = () => {
  const { categorias } = useCategorias()

  return (
    <Tabs >
      <TabList>
        {categorias?.map((categoria: Categoria) => (
          <Tab key={categoria.id}>{categoria.nombre}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {categorias?.map((categoria:Categoria) => (
            <>
         <TabPanel>
                 <Text>Tabla de posicion general</Text>
                <TablaGeneral categoriaId={categoria.id} />
        </TabPanel>
          <TabPanel key={categoria.id}>
            <Text>Tabla de posicion por grupos</Text>

            <GrupoTabs categoriaId={categoria.id} />
          </TabPanel>
            </>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CategoriaTabs;
