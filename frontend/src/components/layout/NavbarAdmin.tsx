import React from 'react';
import { Box, Flex, IconButton, useColorMode, useColorModeValue, Input, InputGroup, InputLeftElement, Avatar, AvatarBadge, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Link, Image } from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { FaSignOutAlt } from 'react-icons/fa';
import Logo  from '../../assets/logo.svg'
import LogoBlanco  from '../../assets/logoblanco.svg'
import useStore from '../../store/store';
import { BorderBeam } from '../ui/BorderBeam';
const Navbar: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const { colorMode }= useColorMode()
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const logout = useStore( (state) => state.logout)

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
        <Flex align="center">
          <InputGroup marginRight={4} display={{ base: 'none', md: 'flex' }} width="auto">
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input type="text" placeholder="Search..." />
          </InputGroup>
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
            onClick={toggleDrawer}
            variant="ghost"
            display={{ base: "block", md: "none" }}
          />
          <Avatar name="User Name" size="sm" display={{ base: 'none', md: 'block' }}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Flex>
      </Flex>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={toggleDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Link href="#">
                Equipos
              </Link>
              <Link href="#">
                Partidos
              </Link>
              <Link href="#">
                Jugadores
              </Link>
              <Link href="#">
                Estadísticas
              </Link>
              <Link href="#">
                Grupos
              </Link>
              <Link href="#">
                Clasificación
              </Link>
              <Link onClick={()=> logout()}>
                <Flex align="center">
                  <FaSignOutAlt />
                  <Box ml={2}>Logout</Box>
                </Flex>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
