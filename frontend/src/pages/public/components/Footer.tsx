import { Box, VStack, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const linkColor = useColorModeValue('teal.600', 'teal.300');
  const linkHoverColor = useColorModeValue('teal.700', 'teal.400');
  const bgColor = useColorModeValue('gray.800', 'gray.900');

  return (
    <Box as="footer" py={8} px={8} bg={bgColor}>
      <Box display="flex" flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center">
        <VStack spacing={2} alignItems={{ base: "center", md: "flex-start" }} mb={{ base: 4, md: 0 }}>
          <Link href="/privacidad" color={linkColor} _hover={{ color: linkHoverColor }}>Politica de privacidad</Link>
          <Link href="/politicas" color={linkColor} _hover={{ color: linkHoverColor }}>Terminos de servicio</Link>
        </VStack>
        <HStack spacing={4} mb={{ base: 4, md: 0 }}>
          <Link href="/twitter" color={linkColor} _hover={{ color: linkHoverColor }}>
            <FaTwitter size={24} />
          </Link>
          <Link href="/facebook" color={linkColor} _hover={{ color: linkHoverColor }}>
            <FaFacebook size={24} />
          </Link>
          <Link href="/instagram" color={linkColor} _hover={{ color: linkHoverColor }}>
            <FaInstagram size={24} />
          </Link>
        </HStack>
        <Text fontSize="lg" color="whiteAlpha.700">&copy;2024 JJDEV18</Text>
      </Box>
    </Box>
  );
};

export default Footer;
