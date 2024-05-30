import { Box, Flex, Grid, Text, Button, useBreakpointValue } from '@chakra-ui/react';
// import { FaHome, FaUsers, FaChartLine, FaCogs, FaQuestionCircle, FaCommentDots } from 'react-icons/fa';
import StatsCard from './components/StatsCard';
import MatchesChart from './components/MatchesChart';
import MatchesTable from './components/MatchesTable';

function Dashboard() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
  

    <Flex direction={{ base: 'column', md: 'row' }} height="100vh">
   
      <Box flex="1" p="4">
        <Text fontSize="2xl" fontWeight="bold">Welcome to your dashboard</Text>
        <Text mb="4">You have 2 teams, 12 matches and 24 players. Need help? Check out the help center.</Text>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="4">
          <StatsCard title="Teams" count={2} />
          <StatsCard title="Matches" count={12} />
          <StatsCard title="Players" count={24} />
        </Grid>
        <Box mt="8">
          <Text fontSize="lg" mb="2">Match count over time</Text>
          <MatchesChart />
        </Box>
        <Box mt="8">
          <Text fontSize="lg" mb="2">Recent matches</Text>
          <MatchesTable />
        </Box>
        {!isMobile && (
          <Button position="fixed" bottom="4" right="4" colorScheme="blue">
            Create a match
          </Button>
        )}
      </Box>
    </Flex>

  );
}

export default Dashboard;
