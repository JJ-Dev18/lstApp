// Layout.js
import { Box, Flex, HStack, IconButton, Image, useColorMode } from "@chakra-ui/react";
import { BellIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Logo  from '../../assets/logo3.svg'
import { HiMenu } from "react-icons/hi";
function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle Theme"
    />
  );
}
interface LayoutProps {
    children: ReactNode;
  }
const Layout = ({ children }: LayoutProps) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token'); // Asegúrate de limpiar cualquier token de autenticación
        navigate('/login');
      };
    
  return (
    
    <Box minH="100vh" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={20}>
         <Image src={Logo}  boxSize={{ base: "40px", md: "50px" }}
                  objectFit="contain"/>
        <HStack spacing={4}>
          <ToggleThemeButton />
         <IconButton icon={<BellIcon />} variant="ghost" aria-label="Notifications" />
         <IconButton as={HiMenu}  variant="ghost" aria-label="Cerrar Sesion" onClick={logout} />
        </HStack>
      </Flex>
      { children }
    </Box>
  );
};

export default Layout;
