import React, { useEffect }  from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import useStore from '../../store/store';
import { MenuAdmin } from './MenuAdmin';
import { MenuPlanillero } from './MenuPlanillero';
import { Role } from '../../interfaces/auth';

const SidebarAdmin: React.FC = () => {
 
  const user = useStore( (state)=> state.user)
  const setNavbarOpen = useStore( (state) => state.setNavbarOpen)

  useEffect(() => {
   setNavbarOpen(false)
  }, [location])
  
   
  
  // useMemo(() => first, [colorMode])

  return (
    <Box
    as="nav"
    position="fixed"
    left={0}
    top="90px" // Altura del navbar
    width="250px"
    height="calc(100vh - 90px)"
    bg={useColorModeValue('gray.100', 'gray.900')}
    boxShadow="md"
    p={5}
    zIndex="999"
    display={{ base: 'none', md: 'block' }}
  >
   
    {
      user?.rol == Role.ADMIN ? 
      <MenuAdmin/>
      : <MenuPlanillero/>
    }
  </Box>
   
  );
};

export default SidebarAdmin;
