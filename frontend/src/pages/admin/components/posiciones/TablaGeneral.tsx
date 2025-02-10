import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Tbody, Td, Th, Thead, Tr, Box, Spinner } from '@chakra-ui/react';
import useStore from '../../../../store/store';
import instance from '../../../../api/axios';

const fetchTablaGeneral = async (categoriaId: number,torneoId:number | undefined) => {
  const response = await instance.get(`/posiciones/${torneoId}/${categoriaId}`);
  console.log(response,"response")
  return response.data;
};

interface Props {
  categoriaId: number;
}

const TablaGeneral: React.FC<Props> = ({ categoriaId }) => {
  const torneo = useStore ( (state)=> state.torneo)
  const { data, isLoading , isError } = useQuery({
    queryKey: ["tablaGeneral", categoriaId],
    queryFn: () => fetchTablaGeneral(categoriaId, torneo?.id),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Box>Error al cargar la tabla de posiciones general.</Box>;
  }

  return (
    <Table variant="simple" mt={4}>
      <Thead>
        <Tr>
          <Th>Equipo</Th>
          <Th>Partidos Jugados</Th>
          <Th>Ganados</Th>
          <Th>Empatados</Th>
          <Th>Perdidos</Th>
          <Th>Goles a Favor</Th>
          <Th>Goles en Contra</Th>
          <Th>Puntos</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((posicion: any) => (
          <Tr key={posicion.equipo}>
            <Td>{posicion.equipo}</Td>
            <Td>{posicion.partidosJugados}</Td>
            <Td>{posicion.partidosGanados}</Td>
            <Td>{posicion.partidosEmpatados}</Td>
            <Td>{posicion.partidosPerdidos}</Td>
            <Td>{posicion.golesAFavor}</Td>
            <Td>{posicion.golesEnContra}</Td>
            <Td>{posicion.puntos}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TablaGeneral;
