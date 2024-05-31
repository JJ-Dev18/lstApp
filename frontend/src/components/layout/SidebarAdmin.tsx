import React from 'react';
import { Box, VStack, Link, Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FaUsers, FaGamepad, FaChartBar, FaSignOutAlt, FaHome, FaBox, FaCog } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import useStore from '../../store/store';
import { BorderBeam } from '../ui/BorderBeam';

const SidebarAdmin: React.FC = () => {
  const location = useLocation();
  const linkBg = useColorModeValue('gray.100', 'gray.700');
  // const linkHoverBg = useColorModeValue('gray.200', 'gray.600');
  const logout = useStore( (state)=> state.logout)
  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: FaHome },
    { href: "/orders", label: "Orders", icon: FaBox },
    { href: "/products", label: "Products", icon: FaGamepad },
    { href: "/customers", label: "Customers", icon: FaUsers },
    { href: "/reports", label: "Reports", icon: FaChartBar },
    { href: "/settings", label: "Settings", icon: FaCog },
    { href: "/logout", label: "Log out", icon: FaSignOutAlt }

  ];


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
    display={{ base: 'none', md: 'block' }}
  >
        <BorderBeam duration={10}/>

    <VStack spacing={4} align="stretch">
    {
          links.map( link =>(
            <Link 
            key={link.href}
            href={link.href}
            bg={location.pathname === link.href ? linkBg : 'transparent'}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Flex align="center">
              <Icon as={link.icon} />
              <Text ml={2}>{link.label}</Text>
            </Flex>
          </Link>
          ))
        }
         <Link 
       
           onClick={() => logout()}
           
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Flex align="center">
              <Icon as={FaSignOutAlt} />
              <Text ml={2}>Cerrar sesion</Text>
            </Flex>
          </Link>
    </VStack>
  </Box>
   
  );
};

export default SidebarAdmin;
