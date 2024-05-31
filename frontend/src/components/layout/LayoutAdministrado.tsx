import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';

const Layout: React.FC = () => {
  return (
    <Flex minHeight="100vh" direction="column">
      <NavbarAdmin />
      <Flex flex="1" p={{ base: 0, md: 20 }} ml={{ base: 0, md: '200px' }} mt={{base :20 , md : 0}} >
        
        <SidebarAdmin />
        <Box flex="1" p={4} position="relative">
        
         <Outlet/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
