// Header.tsx
import { Box, Flex, IconButton, Input, Avatar, useDisclosure, HStack, Drawer, DrawerContent, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerBody, Link, InputGroup, InputLeftElement, Spacer, VStack, useColorMode, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon, BellIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import Logo  from '../../assets/logo.svg'
import LogoBlanco  from '../../assets/logoblanco.svg'
import ToggleThemeButton from './ToggleThemeButton';
const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode  } = useColorMode();
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

  const bgColor = () => {
    if (scrollY > 50) {
      return colorMode === 'light' ? 'gray.100' : 'gray.800';
    }
    return 'transparent';
  };
  return (
    <>
      <Box 
       bg={bgColor()}
       transition="background-color 0.3s ease"
      px={4} borderBottomWidth={1} zIndex="docked" position="fixed" w="full">
        <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Image src={colorMode ==='dark' ? LogoBlanco : Logo}  boxSize={{ base: "80px", md: "80px" }} 
                  objectFit="contain"/>

          </HStack>
          <IconButton
            variant="ghost"
            size="md"
            color={colorMode ==='dark' ? 'white' : 'black'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            mr={2}
            bg="transparent"
            onClick={isOpen ? onClose : onOpen}
          />
         
          <Spacer />
          <HStack as="nav" spacing={4} alignItems="center">
            <InputGroup display={{ base: 'none', md: 'flex' }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input placeholder="Search..." bg="gray.100" border="none" />
            </InputGroup>
             <ToggleThemeButton/>
             <IconButton icon={<BellIcon />} variant="ghost" aria-label="Notifications" />

            <Avatar size="sm" src="https://via.placeholder.com/40" />
          </HStack>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton  variant="ghost"  color={colorMode ==='dark' ? 'white' : 'black'}/>
          <DrawerHeader>Admin Dashboard</DrawerHeader>
          <DrawerBody>
            <VStack as="nav" spacing={4}>
              <Link href="/dashboard">Dashboard  </Link>
              <Link href="/orders">Orders</Link>
              <Link href="/products">Products</Link>
              <Link href="/customers">Customers</Link>
              <Link href="/reports">Reports</Link>
              <Link href="/settings">Settings</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
