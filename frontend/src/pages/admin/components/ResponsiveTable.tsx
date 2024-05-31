import React from 'react';
import {
  useTable,
  Column,
  useResizeColumns,
  useFlexLayout
} from 'react-table';
import { Box, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from '@chakra-ui/react';

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useFlexLayout,
    useResizeColumns
  );

  return (
    <Box overflowX="auto">
      <Table {...getTableProps()} variant="simple" bg={useColorModeValue('gray.100', 'gray.800')} borderRadius="md" shadow="md" minWidth="600px">
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ResponsiveTable;
