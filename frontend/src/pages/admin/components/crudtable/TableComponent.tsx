import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Text, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Action } from './CrudTable';

interface ColumnConfig {
  name: string;
  type: string;
  nested?: string;
}

interface TableComponentProps {
  columns: ColumnConfig[];
  data: any[] | undefined;
  handleOpenModal: (item: any) => void;
  handleDelete: (id: number) => void;
  additionalActions?: Action[];
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data, handleOpenModal, handleDelete, additionalActions }) => {
 
    console.log(data,"Data desde table")
    return (
    <TableContainer>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col.name}>{col.name}</Th>
            ))}
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length + 1}>
                <Text textAlign="center">No información disponible</Text>
              </Td>
            </Tr>
          ) : (
            data?.map((item) => (
              <Tr key={item.id}>
                {columns.map((col) => (
                  <Td key={col.name}>
                    { item[col.name]}
                  </Td>
                ))}
                <Td>
                  <IconButton
                    aria-label="Editar"
                    icon={<EditIcon />}
                    onClick={() => handleOpenModal(item)}
                    mr="2"
                  />
                  <IconButton
                    aria-label="Eliminar"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(item.id)}
                  />
                {additionalActions?.map((action, index) => (
                     
                         <Button
                           key={index}
                           aria-label={action.name}
                           leftIcon={action.icon}
                           onClick={() => action.callback(item)}
                           ml="2"
                         >
                            {action.name}
                         </Button>
                    
                      ))}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
