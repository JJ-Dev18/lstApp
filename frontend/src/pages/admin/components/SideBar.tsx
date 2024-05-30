import React from 'react';
import { Box, VStack, Link, Text, Icon } from '@chakra-ui/react';
import { FaHome, FaUsers, FaChartLine, FaCogs, FaQuestionCircle, FaCommentDots } from 'react-icons/fa';

const Sidebar: React.FC = () => (
   
  <Box
    as="nav"
    position={{ base: 'fixed', md: 'relative' }}
    left="0"
    top="0"
    height="100vh"
    width={{ base: 'full', md: '240px' }}
    bg="gray.800"
    color="white"
    p="4"
    display="flex"
    flexDirection="column"
  >
    <VStack align="start" spacing="4">
      <Link href="#"><Icon as={FaHome} /> <Text ml="2">Dashboard</Text></Link>
      <Link href="#"><Icon as={FaUsers} /> <Text ml="2">Teams</Text></Link>
      <Link href="#"><Icon as={FaChartLine} /> <Text ml="2">Matches</Text></Link>
      <Link href="#"><Icon as={FaCogs} /> <Text ml="2">Players</Text></Link>
      <Link href="#"><Icon as={FaCogs} /> <Text ml="2">Settings</Text></Link>
      <Box mt="auto">
        <Link href="#"><Icon as={FaQuestionCircle} /> <Text ml="2">Help</Text></Link>
        <Link href="#"><Icon as={FaCommentDots} /> <Text ml="2">Feedback</Text></Link>
      </Box>
    </VStack>
  </Box>
);

export default Sidebar;
