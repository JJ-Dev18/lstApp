import {  Box, Heading,} from '@chakra-ui/react';
import CategoriaTabs from './components/posiciones/CategoriaTabs';



export const PosicionesPage = () => {
  return (
    <Box p={4}>
          <Heading mb={4}>Gestión de Posiciones  </Heading>
         
                <CategoriaTabs  />
              
             
            
        </Box>
  )
}
