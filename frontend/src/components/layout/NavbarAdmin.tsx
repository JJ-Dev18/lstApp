import React from 'react';
import { Box, Flex, IconButton, useColorMode, useColorModeValue, Link as ChakraLink, Avatar, AvatarBadge, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton,  Image , Text, DrawerHeader, Icon} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import Logo  from '../../assets/logo.svg'
import LogoBlanco  from '../../assets/logoblanco.svg'
import useStore from '../../store/store';
import { BorderBeam } from '../ui/BorderBeam';
import SearchInput from '../../pages/admin/components/SearchInput';
import { GiSoccerField } from 'react-icons/gi';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const { colorMode }= useColorMode()
  const user = useStore( (state)=> state.user)
  const navbarOpen = useStore( (state) => state.navbarOpen)
  const setNavbarOpen = useStore( (state) => state.setNavbarOpen)
  const logout = useStore( (state) => state.logout)
  const torneo = useStore ( (state ) => state.torneo)
  const links = useStore ( (state ) => state.links)

  
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem"
        bg={useColorModeValue('gray.100', 'gray.900')}
        boxShadow="md"
        position="fixed"
        width="100%"
        zIndex="1000"
        top={0}
        left={0}
      >
        <BorderBeam/>
        <Box fontWeight="bold" fontSize="lg" display="flex" justifyContent="center" alignItems="center">
        <Image src={colorMode ==='dark' ? LogoBlanco : Logo}  boxSize={{ base: "50px", md: "50px" }} 
                  objectFit="contain"/>
           {/* <Text as="h3" size="lg" > Administrador </Text>       */}
        </Box>
        {torneo && (
          
              <Text id='torneo-name' fontSize={{base : 'xs' , md : 'md'}} fontWeight="bold">Torneo: {torneo.nombre}</Text>
              
           
          )}
        <Flex align="center">
          {/* <InputGroup marginRight={4} display={{ base: 'none', md: 'flex' }} width="auto">
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input type="text" placeholder="Search..." />
          </InputGroup> */}
          { user?.rol === 'administrador' &&   <SearchInput className="hidden md:block"/>}
         
          <IconButton
            aria-label="Toggle Color Mode"
            icon={colorModeIcon}
            onClick={toggleColorMode}
            marginRight={4}
            variant="ghost"
          />
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            onClick={()=> setNavbarOpen(true)}
            variant="ghost"
            display={{ base: "block", md: "none" }}
          />
          <Avatar name="User Name" size="sm" display={{ base: 'none', md: 'block' }}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Flex>
      </Flex>
     
      <Drawer isOpen={navbarOpen}
        placement="left"
        onClose={()=> setNavbarOpen(false)}  >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={colorMode == 'dark' ? 'white' : 'black'}/>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <SearchInput />
          <ChakraLink 
         id='inicio'
         as={Link}
         to="/admin/inicio"
        //  bg={location.pathname === "/admin/inicio" ? linkBg : 'transparent'}
        //  color={location.pathname === "/admin/dashboard" ? linkText : 'transparent'}
         
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
        <Flex align="center" className='hover:text-white dark:hover:text-white' >
          <Icon as={FaHome} />
          <Text 
            //  color={location.pathname === "/admin/inicio" ? 'white' : linkText}
          
          ml={2}>Inicio</Text>
        </Flex>
      </ChakraLink>
      {
        user?.torneos && user?.torneos > 0  && (
          <ChakraLink 
         id='torneos-mobile'
         as={Link}
         to="/admin/torneos"
        //  bg={location.pathname === "/admin/torneos" ? linkBg : 'transparent'}
        //  color={location.pathname === "/admin/dashboard" ? linkText : 'transparent'}
         
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
        <Flex align="center" className='hover:text-white dark:hover:text-white' >
          <Icon as={GiSoccerField} />
          <Text 
            //  color={location.pathname === "/admin/torneos" ? 'white' : linkText}
          
          ml={2}>Torneos</Text>
        </Flex>
      </ChakraLink>
        )
      }
      {
        (torneo) &&  links.map( link =>(
            <ChakraLink 
            id={`${link.label}-mobile`}
            as={Link}
            key={link.href}
            to={link.href}
            // bg={location.pathname === link.href ? linkBg : 'transparent'}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Flex align="center" className='hover:text-white dark:hover:text-white'>
              <Icon as={link.icon} className='hover:text-white' />
              <Text 
            //  color={location.pathname === link.href ? 'white' : linkText}
              
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
              //  color={location.pathname === 'link.href' ? 'white' : linkText}
              //  color={location.pathname === "/admin/dashboard" ? linkText : 'transparent'}
              ml={2}>Cerrar sesion</Text>
            </Flex>
          </ChakraLink>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
