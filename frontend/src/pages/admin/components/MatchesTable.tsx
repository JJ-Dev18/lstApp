import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface Match {
  date: string;
  team: string;
  result: string;
  opponent: string;
  venue: string;
}

const matches: Match[] = [
  { date: '2/7/22', team: 'Team 1', result: 'Win', opponent: 'Opponent', venue: 'Home' },
  { date: '2/14/22', team: 'Team 2', result: 'Loss', opponent: 'Opponent', venue: 'Away' },
  { date: '2/21/22', team: 'Team 3', result: 'Win', opponent: 'Opponent', venue: 'Home' },
  { date: '2/28/22', team: 'Team 4', result: 'Tie', opponent: 'Opponent', venue: 'Away' },
  { date: '3/7/22', team: 'Team 5', result: 'Win', opponent: 'Opponent', venue: 'Home' },
];

const MatchesTable: React.FC = () => (
  <Box overflowX="auto">
    <Table variant="simple" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Team</Th>
          <Th>Result</Th>
          <Th>Opponent</Th>
          <Th>Venue</Th>
        </Tr>
      </Thead>
      <Tbody>
        {matches.map((match, index) => (
          <Tr key={index}>
            <Td>{match.date}</Td>
            <Td>{match.team}</Td>
            <Td>{match.result}</Td>
            <Td>{match.opponent}</Td>
            <Td>{match.venue}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

export default MatchesTable;
