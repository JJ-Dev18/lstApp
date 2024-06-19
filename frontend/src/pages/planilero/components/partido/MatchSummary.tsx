import { Box, Text, Flex, Card } from '@chakra-ui/react';

export function MatchSummary() {
  const summary = [
    { label: 'Goals', value: 7 },
    { label: 'Assists', value: 4 },
    { label: 'Blocks', value: 3 },
    { label: 'Timeouts', value: 2 },
  ];

  return (
    <Card  p={4} rounded="lg">
      <Text fontSize="lg" fontWeight="bold" mb={2}>Match Summary</Text>
      <Flex gap={4}>
        {summary.map(({ label, value }, index) => (
          <Box key={index}>
            <Text fontSize="sm" color="gray.400" mb={1}>{label}</Text>
            <Text fontSize="2xl" fontWeight="bold">{value}</Text>
          </Box>
        ))}
      </Flex>
    </Card>
  );
}