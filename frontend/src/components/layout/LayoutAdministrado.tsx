import React, { useEffect } from "react";
import { Box, Button, Flex} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";
import Tour from "./Tour";
import useStore from "../../store/store";

const Layout: React.FC = () => {

  const setTorneo= useStore( (state) => state.setTorneo)

  useEffect(() => {
    const storedTorneo = localStorage.getItem('torneo');
    if (storedTorneo) {
        setTorneo(JSON.parse(storedTorneo)); // Inicializa el estado con el valor de localStorage si existe
    }
}, [setTorneo]);

  return (
    <Flex minHeight="100vh" direction="column">
      <NavbarAdmin />
      <Flex
        flex="1"
        p={{ base: 0, md: 20 }}
        ml={{ base: 0, md: "200px" }}
        mt={{ base: 20, md: 0 }}
      >
        <SidebarAdmin />
        <Box flex="1" p={6} position="relative">
          <Outlet />
         
           <Tour/>
           
        
           
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
