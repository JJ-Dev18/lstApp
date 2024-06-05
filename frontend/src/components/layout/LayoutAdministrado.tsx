import React from "react";
import { Box, Button, Flex} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";
import Tour from "./Tour";
import useStore from "../../store/store";

const Layout: React.FC = () => {

  const setOpenform= useStore( (state) => state.setOpenForm)
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
           <Button 
            size={{base :'md', md : 'lg'}}
             onClick={() => setOpenform(true)}
             
             id="btn-crear" aria-label="crear torneo" position="fixed" bottom={5} left={8}>
              <IoAddOutline /> Crear Torneo 
             </Button>
        
           
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
