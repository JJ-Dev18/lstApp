import { Card, CardBody, Image, Heading, Text } from "@chakra-ui/react";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ image, title, description }) => (
  <Card>
    <CardBody>
      <Image src={image} alt={title} w={{base : '100%'}}/>
      <Heading as="h4" size="md" mt={4}>{title}</Heading>
      <Text fontSize="lg">{description}</Text>
    </CardBody>
  </Card>
);

export default FeatureCard;
