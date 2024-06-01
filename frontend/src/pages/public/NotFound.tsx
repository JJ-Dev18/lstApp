import { Box, Text } from '@chakra-ui/react';

const UnderConstruction = () => {
  return (
    <Box
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/under.webp')" }}
    >
      {/* <Box className="absolute inset-0 bg-black opacity-50"></Box> */}
      <Box className="relative z-10 text-center">
        <Text fontSize="6xl" fontWeight="bold" color="white" mb={4}>
        
        </Text>
      </Box>
    </Box>
  );
};

export default UnderConstruction;
