import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLegend, VictoryAxis, VictoryContainer } from 'victory';
import { Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

const dataEscritorio = [
  { x: 'Jan', y: 43 },
  { x: 'Feb', y: 137 },
  { x: 'Mar', y: 61 },
  { x: 'Apr', y: 145 },
  { x: 'May', y: 26 },
  { x: 'Jun', y: 154 },
];

const dataCelular = [
  { x: 'Jan', y: 60 },
  { x: 'Feb', y: 48 },
  { x: 'Mar', y: 177 },
  { x: 'Apr', y: 78 },
  { x: 'May', y: 96 },
  { x: 'Jun', y: 204 },
];

const CurvedlineChart: React.FC = () => {
  const chartWidth = useBreakpointValue({ base: 300, md: 1200 }) || 1200;
  const chartHeight = useBreakpointValue({ base: 300, md: 400 }) || 400;
  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('black', 'white');
  const gridColor = useColorModeValue('#ddd', '#444');

  const axisStyle = {
    axis: { stroke: borderColor },
    tickLabels: { fill: textColor },
    grid: { stroke: gridColor },
  };

  return (
    <Box width="100%" maxW="1200px" mx="auto" p={4}>
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 500 }}
        width={chartWidth}
        height={chartHeight}
        containerComponent={<VictoryContainer responsive={true} />}
      >
        <VictoryLegend
          x={chartWidth / 3}
          y={50}
          orientation="horizontal"
          gutter={20}
          style={{
            border: { stroke: borderColor },
            title: { fontSize: 20, fill: textColor }
          }}
          data={[
            { name: 'Escritorio', symbol: { fill: '#4FD1C5' } },
            { name: 'Celular', symbol: { fill: '#a7aaff' } },
          ]}
        />
        <VictoryAxis style={axisStyle} />
        <VictoryAxis dependentAxis style={axisStyle} />
        <VictoryLine
          data={dataEscritorio}
          style={{
            data: { stroke: '#4FD1C5' },
            parent: { border: `1px solid ${borderColor}` },
          }}
        />
        <VictoryLine
          data={dataCelular}
          style={{
            data: { stroke: '#a7aaff' },
            parent: { border: `1px solid ${borderColor}` },
          }}
        />
      </VictoryChart>
    </Box>
  );
};

export default CurvedlineChart;
