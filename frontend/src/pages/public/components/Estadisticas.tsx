import {  Heading, Text, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import NumberTicker from "../../../components/ui/NumberTicket";
import { NeonGradientCard } from "../../../components/ui/NeonGradientCard";

type Props = { 
    title : string;
    value : string;
}
const Estadisticas:FC<Props> = ({title,value}) => {
const { colorMode } = useColorMode()

  return (
    <NeonGradientCard borderSize={1} className={`items-center justify-center text-center ${colorMode  === 'light' ?' bg-gray-100' : 'bg-neutral-900'}` } neonColors={{firstColor :  "#4FD1C5", secondColor: "#a7aaff",}}>
    <Heading as="h3" size="md" mb={2}>{title}</Heading>
    <Text fontSize="3xl" fontWeight="bold" color="blue.500"> <NumberTicker value={Number(value)} className="text-teal-400 " /></Text>
   
    </NeonGradientCard>

  );
};

export default Estadisticas;
