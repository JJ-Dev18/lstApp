import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FC } from "react";
import { EventoType } from "../../interfaces/marcador";
import { LuGoal } from "react-icons/lu";
import { GiThrowingBall } from "react-icons/gi";
import { SiAdblock } from "react-icons/si";
import { FaTrash } from "react-icons/fa";
type Props = {
  event: EventoType;
  align: 'left' | 'right';
  color: string;
  onDelete: (id?: number) => void;
};

export const Evento: FC<Props> = ({ event, align,color, onDelete }) => {
  const { tiempo, tipo, jugador, comentario } = event;
  console.log(tipo, "tipo");
  return (
    <Flex justify={align === "left" ? "flex-start" : "flex-end"} mb={4}>
      <Box bg={color} p={4} rounded="md" shadow="md" maxW={{ base: '70%', md: '100%' }} position="relative" >
        <Text fontWeight="bold">
          {tipo} - #{jugador?.nombre} - {jugador?.equipo.nombre}
        </Text>
        <IconButton
            aria-label="Delete event"
            icon={<FaTrash />}
            color='white'
            size="sm"
            onClick={() => onDelete(event.id)}
            position="absolute"
            bottom={2}
            right={2}
          />
        <Flex align="center"  mt={2}>
          {tipo === "gol" ? (
            <LuGoal />
          ) : tipo === "asistencia" ? (
            <GiThrowingBall />
          ) : (
            <SiAdblock />
          )}
          <Text ml={1}>{tiempo}</Text>
          <Text ml={1}>{comentario}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};


