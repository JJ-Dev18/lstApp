import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Header = () => (
  <Box textAlign="center" position="relative" bgPosition={{ base: "center",md : 'center 0px 10px' }} py={{ base :24 , md :32 , lg : 80}} bgImage="url(/src/assets/inicio/header.webp)" bgSize="cover" >
   <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.6)" // Overlay oscuro
      zIndex={0}
    />
    <Box position="relative" zIndex={1}>
      <Heading as="h2" size={{ base: "2xl", md: "4xl" }} mb={4} color="white">
        Live Score Tracking
      </Heading>
      <Text fontSize={{ base: "lg", md: "xl" }} mb={6} color="white">
      La mejor manera de realizar un seguimiento de tus juegos, torneos y ligas de Ultimate Frisbee en tiempo real.
      </Text>
      <Button bg="teal.400" fontSize={{ base: "md", md: "lg" }}>
        Start tracking now
      </Button>
    </Box>
  </Box>
);

export default Header;
