import {  Image,  Heading, Text, Button, Flex, Box, VStack, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { PartidoType } from '../../interfaces/marcador'
import ImagePartido  from '../../assets/partidos/1.webp'
import { BorderBeam } from "../ui/BorderBeam";

export const Partido = (props:PartidoType) => {
  const { colorMode} = useColorMode()
    const { id, equipo1, equipo2,estado ,fecha,categoria} = props
    const navigate = useNavigate()
  return (
    <Flex
    direction={{ base: "column", md: "row" }}
    align="center"
    justify={{ base: "flex-start", md: "space-between" }}
    p={4}
    position="relative"
    bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
    borderWidth={1}
    borderRadius="lg"
  >

    <Box flexShrink={0}>
      <Image
        borderRadius="lg"
        width={{ base: "100%", md: "200px" }}
        src={ImagePartido}
        alt={` image`}
      />
    <BorderBeam size={250} duration={12} delay={9} />
    </Box>
    <VStack w="100%" justifyContent="flex-end"  spacing={2} mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
      <Text>{categoria.nombre}</Text>
      <Heading as="h2" size="md">
       {equipo1.nombre} vs { equipo2.nombre}
      </Heading>
      <Text fontWeight="bold">{'11:30'} { new Date(fecha).toLocaleDateString()}</Text>
      <Button borderWidth={3} variant="outline" onClick={()=> navigate(`/partidos/${id}`)}>
        View Game
      </Button>
    </VStack>
  </Flex>
  )
}
