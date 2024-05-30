import { Card, CardBody } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    imageSrc? : string,
    name : string , 
    location? : string
}

const TeamCard :FC<Props>= ({ imageSrc, name, location }) => {
  return (
    <Card className="bg-[#1e293b]">
    <CardBody>
      <img
        alt={name}
        className="w-full h-48 md:h-64 object-cover"
        src={imageSrc}
      />
      <h4 className="text-xl md:text-2xl font-semibold mt-4">{name}</h4>
      <p className="text-sm md:text-lg">{location}</p>
    </CardBody>
  </Card>
  );
};

export default TeamCard;
