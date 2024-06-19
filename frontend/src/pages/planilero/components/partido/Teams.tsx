import { Box, Card, Flex, Text } from '@chakra-ui/react';

export function Teams() {
  const teams = [
    { name: 'Red Foxes', color: 'red.500', players: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Sarah Lee', 'Tom Wilson'] },
    { name: 'Blue Jays', color: 'blue.500', players: ['Emily Davis', 'Michael Chen', 'Olivia Patel', 'David Nguyen', 'Sophia Ramirez'] },
  ];

  return (
    <Card  p={4} rounded="lg" mb={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>Teams</Text>
      <Flex gap={4}>
        {teams.map(({ name, color, players }, index) => (
          <Box key={index}>
            <Flex align="center" gap={2} mb={2}>
              <Box bg={color} rounded="full" w={8} h={8} display="flex" alignItems="center" justifyContent="center" fontWeight="bold">
                {name.charAt(0)}
              </Box>
              <Text fontSize="lg" fontWeight="bold">{name}</Text>
            </Flex>
            <Text fontSize="sm" color="gray.400">
              {players.map((player, i) => (
                <Box key={i}>{i + 1}. {player}</Box>
              ))}
            </Text>
          </Box>
        ))}
      </Flex>
    </Card>
  );
}