// LayoutEspectador.tsx
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';
type Props = {
    children : ReactNode
}
const LayoutEspectador: React.FC <Props> = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Flex direction="column" flex="1" ml={{ base: 0, md: '200px' }}>
        <Header />
        <Box p={4}>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default LayoutEspectador;
