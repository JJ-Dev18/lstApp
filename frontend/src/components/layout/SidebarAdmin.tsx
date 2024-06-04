import React from 'react';
import { Box, VStack, Link as ChakraLink, Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FaUsers, FaGamepad, FaChartBar, FaSignOutAlt, FaHome, FaBox, FaCog } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import useStore from '../../store/store';
import { Link } from 'react-router-dom';

const SidebarAdmin: React.FC = () => {
  const location = useLocation();
  const linkBg = useColorModeValue('teal.500', 'teal.700');
  const linkText = useColorModeValue('white', 'white');


  // const linkHoverBg = useColorModeValue('gray.200', 'gray.600');
  const logout = useStore( (state)=> state.logout)
  const user = useStore( (state)=> state.user)

  const links = [
    { href: "/admin/torneos", label: "Torneos", icon: FaHome },
    // { href: "/admin/dashboard", label: "Dashboard", icon: FaHome },
    { href: "/admin/equipos", label: "Equipos", icon: FaBox },
    { href: "/admin/partidos", label: "Partidos", icon: FaGamepad },
    { href: "/admin/jugadores", label: "Jugadores", icon: FaUsers },
    { href: "/admin/estadísticas", label: "Estadísticas", icon: FaChartBar },
    { href: "/admin/grupos", label: "Grupos", icon: FaCog },
    { href: "/admin/clasificación", label: "Clasificación", icon: FaCog },

   
  ];
  
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
    display={{ base: 'none', md: 'block' }}
  >
 
    <VStack spacing={4} align="stretch" >
    <ChakraLink 
         as={Link}
         to="/admin/dashboard"
         bg={location.pathname === "/admin/dashboard" ? linkBg : 'transparent'}
         color={location.pathname === "/admin/dashboard" ? linkText : 'transparent'}
         
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
        <Flex align="center">
          <Icon as={FaSignOutAlt} />
          <Text className='hover:text-white dark:hover:text-white' 
             color={location.pathname === "/admin/dashboard" ? linkText : 'transparent'}
          
          ml={2}>Dashboard</Text>
        </Flex>
      </ChakraLink>
     {/* <ChakraLink 
         as={Link}
         to="/admin/torneos"
         bg={location.pathname === "/admin/torneos" ? linkBg : 'transparent'}

        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
        <Flex align="center">
          <Icon as={FaSignOutAlt} />
          <Text className='hover:text-white dark:hover:text-white' ml={2}>Torneos</Text>
        </Flex>
      </ChakraLink> */}
    {
        (user?.torneos && user.torneos > 0) &&  links.map( link =>(
            <ChakraLink 
            as={Link}
            key={link.href}
            to={link.href}
            bg={location.pathname === link.href ? linkBg : 'transparent'}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Flex align="center" className='hover:text-white dark:hover:text-white'>
              <Icon as={link.icon} className='hover:text-white' />
              <Text 
             color={location.pathname === link.href ? linkText : 'transparent'}
              
              ml={2}>{link.label}</Text>
            </Flex>
          </ChakraLink>
          ))
        }
         <ChakraLink 
       
           onClick={() => logout()}
           
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Flex align="center">
              <Icon as={FaSignOutAlt} />
              <Text 
              //  color={location.pathname === "/admin/dashboard" ? linkText : 'transparent'}
              className='hover:text-white dark:hover:text-white' ml={2}>Cerrar sesion</Text>
            </Flex>
          </ChakraLink>
    </VStack>
  </Box>
   
  );
};

export default SidebarAdmin;
