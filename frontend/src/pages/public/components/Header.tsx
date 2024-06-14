import { Box, Heading, Text, Button, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/inicio/header.webp";
    img.onload = () => setLoading(false);
  }, []);

  return (
    <Box textAlign="center" position="relative" py={{ base: 24, md: 32, lg: 80 }}>
      <Skeleton position={"absolute"}  fadeDuration={1}   isLoaded={!loading} width="100%" height="100%" top={0}>
        <Box
          bgImage="url(/assets/inicio/header.webp)"
          bgPosition={{ base: "center", md: "center 0px 10px" }}
          bgSize="cover"
          height="100%"
          width="100%"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
      </Skeleton>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.6)"
        zIndex={0}
      />
      <Box position="relative" zIndex={1}>
        <Heading as="h2" size={{ base: "2xl", md: "4xl" }} mb={4} color="white">
          Live Score Tracking
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} mb={6} color="white">
          La mejor manera de realizar un seguimiento de tus juegos, torneos y ligas de Ultimate Frisbee en tiempo real.
        </Text>
        <Button bg="teal.400" fontSize={{ base: "md", md: "lg" }} onClick={()=> navigate('/login')}>
          ¡Empieza ahora!
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
