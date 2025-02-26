import { Box, Button, Skeleton , Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import LogoBlancoHorizontal '../'
// import LogoGrande from "../../../assets/logohorizontal.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/inicio/header2.webp";
    img.onload = () => setLoading(false);
  }, []);

  return (
    <Box textAlign="center" position="relative" py={{ base: 0, md: 0, lg: 0 }} 
 
    height={{ base: "400px", md: "400px", lg: "400px" , xl: '500px', '2xl' : '600px'  }}
    >
      <Skeleton position={"absolute"}  fadeDuration={1}   isLoaded={!loading} width="100%" height="100%" top={0}>
        <Box
          bgImage="url(/assets/inicio/header3.jpg)"
          bgPosition={{ base: "center" }}
          bgSize={{ base: "cover"  }}
          backgroundRepeat="no-repeat"
          height="100%"
         
          width="100%"
          position="absolute"
          top={0}
          left={0}
        
        />
      </Skeleton>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.7)"
        zIndex={0}
       
      />
      <Box position="relative" zIndex={1} display="flex" flexDirection='column'
      justifyContent="center"  alignItems="center"  
      height="100%"
      >
       
              <Heading as="h2" size={{ base: "2xl", md: "4xl" }} mb={4} color="white" display={{ base :'none', md : 'block'}}>
                Ultimate Frisbee Tracker
              </Heading>
             
              <Text fontSize={{ base: "lg", md: "xl" }} mb={6} color="white"  display={{ base :'none' , md : 'block'}}>
              
              UFT es la herramienta para seguir tus partidos en tiempo real, estadísticas detalladas y análisis completo.
              </Text>
              <Button bg="custom.brightRed" width={200} height={50} color={'white'} fontSize={{ base: "md", md: "lg" }} onClick={()=> navigate('/login')}>
                ¡Empieza ahora!
              </Button>
      </Box>
    </Box>
  );
};

export default Header;
