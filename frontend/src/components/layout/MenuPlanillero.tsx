import { VStack, useColorModeValue , Link as ChakraLink, Flex, Icon, Text} from '@chakra-ui/react';
import useStore from '../../store/store';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

export const MenuPlanillero = () => {
    const linkBg = useColorModeValue('teal.500', 'teal.700');
    const linkText = useColorModeValue('black', 'white');
    
  
    // const linkHoverBg = useColorModeValue('gray.200', 'gray.600');
    const logout = useStore( (state)=> state.logout)
    // const torneo = useStore( (state)=> state.torneo)
    const links = useStore ( (state) => state.links)

  return (
    <VStack spacing={4} align="stretch" >
   
      
   
    {
         links.map( link =>(
            <ChakraLink 
            id={link.label}
            as={Link}
            key={link.href}
            to={link.href}
            bg={location.pathname === link.href ? linkBg : 'transparent'}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Flex align="center" className='hover:text-white dark:hover:text-white'>
              <Icon as={link.icon} className='hover:text-white' />
              <Text 
             color={location.pathname === link.href ? 'white' : linkText}
              
              ml={2}>{link.label}</Text>
            </Flex>
          </ChakraLink>
          ))
        }
         <ChakraLink 
       
           onClick={() => logout()}
           
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Flex align="center"  className='hover:text-white dark:hover:text-white'>
              <Icon as={FaSignOutAlt} />
              <Text 
               color={location.pathname === 'link.href' ? 'white' : linkText}
              //  color={location.pathname === "/admin/dashboard" ? linkText : 'transparent'}
              ml={2}>Cerrar sesion</Text>
            </Flex>
          </ChakraLink>
    </VStack>
  )
}
