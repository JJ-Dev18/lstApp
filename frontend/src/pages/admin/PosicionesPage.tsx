import {  Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import CategoriaTabs from './components/posiciones/CategoriaTabs';
import TablaGeneral from './components/posiciones/TablaGeneral';
import { useState } from 'react';



export const PosicionesPage = () => {
  return (
    <Box p={4}>
          <Heading mb={4}>Gestión de Posiciones</Heading>
         
                <CategoriaTabs  />
              
             
            
        </Box>
  )
}
