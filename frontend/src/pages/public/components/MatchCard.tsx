import { Card, CardBody } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    imageSrc? : string,
    title : string , 
    date? : string
}

const MatchCard :FC<Props>= ({ imageSrc, title, date }) => {
  return (
    <Card className="bg-[#1e293b]">
    <CardBody>
      <img
        alt={title}
        className="w-full h-48 md:h-64 object-cover"
        src={imageSrc}
      />
      <h4 className="text-xl md:text-2xl font-semibold mt-4">{title}</h4>
      <p className="text-sm md:text-lg">{date}</p>
    </CardBody>
  </Card>
  );
};

export default MatchCard;
