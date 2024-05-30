import React from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  count: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, count }) => (
  <Box bg="gray.700" p="4" borderRadius="md" textAlign="center">
    <Text fontSize="lg" color="gray.400">{title}</Text>
    <Stack direction="row" justify="center" align="center">
      <Text fontSize="2xl" fontWeight="bold" color="white">{count}</Text>
      <Text fontSize="xl" color="gray.400">+0</Text>
    </Stack>
  </Box>
);

export default StatsCard;
