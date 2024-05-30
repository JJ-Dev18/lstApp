// LayoutPublic.tsx
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import { ReactNode } from 'react';

type Props = {
    children : ReactNode
}
const LayoutPublic: React.FC<Props> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        {children}
      </Box>
    </Flex>
  );
};

export default LayoutPublic;
