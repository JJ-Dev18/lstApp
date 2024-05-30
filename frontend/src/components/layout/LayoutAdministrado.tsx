// LayoutAdministrador.tsx
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
type Props = {
  
}
const LayoutAdministrador: React.FC  <Props> = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex flex="1">
        <Sidebar />
        <Box flex="1" p={{ base: 0, md: 20 }} ml={{ base: 0, md: '200px' }} mt={{base :20 , md : 0}}>
          <Outlet/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LayoutAdministrador;
