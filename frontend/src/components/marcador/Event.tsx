import { Box, HStack, Text, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import { EventoType } from "../../interfaces/marcador";
import { LuGoal } from "react-icons/lu";
import { GiThrowingBall } from "react-icons/gi";
import { SiAdblock } from "react-icons/si";
type Props = {
  event: EventoType;
};

export const Evento: FC<Props> = ({ event }) => {
  const { colorMode } = useColorMode();
  const { tiempo, tipo, jugador,  } = event;
  console.log(tipo,"tipo")
  return (
    <Box
      bg={colorMode === "dark" ? "gray.800" : "gray.200"}
      p={4}
      borderRadius="md"
      w="full"
    >
      <HStack spacing={4}>
        <Box
          bg={colorMode === "dark" ? "gray.700" : "gray.200"}
          p={2}
          borderRadius="md"
        >
          {tipo === "gol" ? (
            <LuGoal />
          ) : tipo === "asistencia" ? (
            <GiThrowingBall />
          ) : (
            <SiAdblock />
          )}
          
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="bold">
            {tipo} - #{jugador.numero} - {jugador.nombre}
          </Text>
          <Text fontSize="sm">
            {" "}
            {tiempo} {jugador.equipo.nombre}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};
