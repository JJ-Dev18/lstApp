import React, { useEffect, useMemo, useState } from "react";
import { Box, Heading, HStack, Button, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useColorMode, Image } from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import ToggleThemeButton from "../../../components/layout/ToggleThemeButton";
import Logo  from '../../../assets/logo.svg'
import LogoBlanco  from '../../../assets/logoblanco.svg'
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState<'right' | 'left'>('left');
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const bgColor = useMemo(() => {
    if (scrollY > 50) {
      return colorMode === 'light' ? 'gray.100' : 'gray.800';
    }
    return 'transparent';
  }, [scrollY, colorMode]);

  const logoColor = useMemo(() => {
    if (scrollY > 50) {
      return colorMode === 'light' ? Logo : LogoBlanco;
    }
    return LogoBlanco;
  }, [scrollY, colorMode]);

  // const textLogin = useMemo(() => {
  //   if (scrollY > 50) {
  //     return colorMode === 'light' ? 'black' : 'white';
  //   }
  //   return 'white';
  // }, [scrollY, colorMode]);
  return (
    <Box  bg={bgColor} position="fixed" top={0} zIndex={999} width='100vw'
    transition="background-color 0.3s ease" as="nav" display="flex" justifyContent="space-between" alignItems="center" py={4} px={8}>
      <Heading as="h1" size="lg" cursor="pointer">
      <Image src={logoColor} alt="Logo LST" boxSize={{ base: "60px", md: "60px" }} onClick={() => navigate('/')}
                  objectFit="contain"/>
      </Heading>
      <HStack spacing={4} display={{ base: "none", md: "flex" }}>
        {/* <Link href="#" fontSize="lg" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:text-white hover:bg-gray-400 dark:hover:bg-gray-500">Tournaments</Link>
        <Link href="#" fontSize="lg" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:text-white hover:bg-gray-400 dark:hover:bg-gray-500">Teams</Link>
        <Link href="#" fontSize="lg" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:text-white hover:bg-gray-400 dark:hover:bg-gray-500">Matches</Link>
        <Link href="#" fontSize="lg" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:text-white hover:bg-gray-400 dark:hover:bg-gray-500">Stats</Link> */}
        <ToggleThemeButton/>
        <Button bg="brand.500" variant="ghost"  color="white" fontSize="lg" onClick={() => navigate('/login')}>Iniciar</Button>
        {/* <Button bg="brand.300" fontSize="lg">Sign Up</Button> */}
      </HStack>
     
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="ghost"
      />
      
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={colorMode == 'dark' ? 'white' : 'black'}/>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            {/* <Link href="#" fontSize="lg" display="block" mb={2} _hover={{ color: "brand.300" }} onClick={onClose}>Tournaments</Link>
            <Link href="#" fontSize="lg" display="block" mb={2} _hover={{ color: "brand.300" }} onClick={onClose}>Teams</Link>
            <Link href="#" fontSize="lg" display="block" mb={2} _hover={{ color: "brand.300" }} onClick={onClose}>Matches</Link>
            <Link href="#" fontSize="lg" display="block" mb={2} _hover={{ color: "brand.300" }} onClick={onClose}>Stats</Link> */}
            <Button
              leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              colorScheme="teal"
              variant="solid"
              mb={4}
              w="full"
              className="mb-4 w-full"
            >
              {colorMode === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
            </Button>
            
            <Button fontWeight="bold" variant="ghost" fontSize="lg" display="block" mb={2} onClick={() => navigate('/login')}>Iniciar</Button>

            {/* <Button bg="brand.300" fontSize="lg" display="block" onClick={onClose}>Sign Up</Button> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
