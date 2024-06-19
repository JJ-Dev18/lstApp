import {  Card, Text } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  fecha : string;
  planillero : string 
}

const MatchInfo:FC<Props> = ({ fecha,planillero})=>  {
  return (
    <Card  p={4} rounded="lg" mb={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>Informacion del partido</Text>
      <Text fontSize="sm" color="gray.400">
        {fecha}
        <br />
        {planillero}
      </Text>
    </Card>
  );
}
export default MatchInfo