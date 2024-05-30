// Sidebar.tsx
import { Box, VStack, Link, Icon, useColorModeValue, Flex } from '@chakra-ui/react';
import React from 'react';
import { FiHome, FiShoppingBag, FiBox, FiUsers, FiBarChart, FiSettings, FiLogOut } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import useStore from '../../store/store';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const linkBg = useColorModeValue('gray.100', 'gray.700');
  const linkHoverBg = useColorModeValue('gray.200', 'gray.600');
  const logout = useStore((state) => state.logout);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: FiHome },
    { href: "/admin/orders", label: "Orders", icon: FiShoppingBag },
    { href: "/admin/products", label: "Products", icon: FiBox },
    { href: "/admin/customers", label: "Customers", icon: FiUsers },
    { href: "/admin/reports", label: "Reports", icon: FiBarChart }
  ];

  return (
    <Box
      pos="fixed"
      left="0"
      p="5"
      w="200px"
      top="0"
      h="full"
      
      borderRightWidth={1}
      display={{ base: 'none', md: 'block' }}
      zIndex="sticky"
      pt="20"
    >
      <Flex direction="column" h="full">
        <VStack as="nav" spacing={4} align="start" flex="1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              display="flex"
              alignItems="center"
              bg={location.pathname === link.href ? linkBg : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ bg: linkHoverBg ,textDecoration:'none'}}
              textDecoration="none"
            >
              <Icon as={link.icon} mr={2} />
              {link.label}
            </Link>
          ))}
        </VStack>
        <VStack as="nav" spacing={4} align="start" pt={4}>
          <Link
            href="/admin/settings"
            display="flex"
            alignItems="center"
            bg={location.pathname === "/admin/settings" ? linkBg : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: linkHoverBg ,textDecoration:'none'}}
            textDecoration="none"
          >
            <Icon as={FiSettings} mr={2} />
            Settings
          </Link>
          <Link
            onClick={ () => logout()}
            display="flex"
            alignItems="center"
            p={2}
            borderRadius="md"
            _hover={{ bg: linkHoverBg ,textDecoration:'none'}}
            textDecoration="none"
          >
            <Icon as={FiLogOut} mr={2} />
            Sign out
          </Link>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
