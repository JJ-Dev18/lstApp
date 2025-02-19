import { useState, useEffect, ChangeEvent, FC, useMemo } from 'react';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  CellContext,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  VStack,
  useToast,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import FileUpload from './FileUpload';
import { Jugador } from '../../../../interfaces/jugador';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { createPlayers, deletePlayer, fetchPlayers } from '../../../../api/admin/jugadores';
import { SiMicrosoftexcel } from 'react-icons/si';
import axios from 'axios';

interface EditableCellProps {
  value: any;
  row: Row<Jugador>;
  column: { id: string };
  updateMyData: (rowIndex: number, columnId: string, value: any) => void;
}

const EditableTable: FC = () => {
  const { equipoId: teamId } = useParams<{ equipoId: string }>();
  const equipoId = parseInt(teamId!, 10);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: jugadores, isLoading } = useQuery({
    queryKey: ['jugadores', equipoId],
    queryFn: () => fetchPlayers(equipoId),
  });

  const mutation = useMutation({
    mutationFn: createPlayers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jugadores', equipoId] });
      toast({
        title: 'Jugadores agregados con éxito.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    // onError: (error: any) => {
    //   toast({
    //     title: 'Error al agregar jugadores.',
    //     description: error.response?.data?.error || 'Hubo un problema al agregar los jugadores',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jugadores', equipoId] });
      toast({
        title: 'Jugador eliminado.',
        description: 'El jugador ha sido eliminado exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error.',
        description: 'Hubo un problema al eliminar el jugador.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const [data, setData] = useState<Jugador[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('nombre');
  const [sorting, setSorting] = useState<SortingState>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playerToDelete, setPlayerToDelete] = useState<Jugador | null>(null);
  const [filaSelected, setFilaSelected] = useState<number | null>(null);

  useEffect(() => {
    if (jugadores) {
      setData(jugadores);
    }
  }, [jugadores]);

  const handleAddRow = () => {
    setData([...data, { documento: '', nombre: '', equipoId: equipoId, numero: 0, posicion: '', fotoUrl: '', eps: '', edad: '' }]);
  };

  const handleFileUpload = (newPlayers: Jugador[]) => {
    setData(newPlayers.map(player => ({ ...player, equipoId })));
  };

  const handleSubmit = () => {
    mutation.mutate({ newPlayers: data, equipoId });
  };

  const updateMyData = (rowIndex: number, columnId: string, value: any) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const debouncedSearch = useMemo(() =>
    debounce((value: any) => {
      setSearchTerm(value);
    }, 300), []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const filteredData = useMemo(() => data.filter((jugador) => {
    if (filterType === 'nombre') {
      return jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (filterType === 'posicion') {
      return jugador.posicion.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  }), [data, searchTerm, filterType]);

  const columns: ColumnDef<Jugador>[] = [
    {
      accessorKey: 'fotoUrl',
      header: 'Foto URL',
      cell: (info: CellContext<Jugador, any>) => (
        <Box display="flex">
          <img src={info.getValue()} alt="img jugador" />
        </Box>
      ),
    },
    {
      accessorKey: 'documento',
      header: 'Documento',
      cell: (info: CellContext<Jugador, any>) => (
        <EditableCell
          value={info.getValue()}
          row={info.row}
          column={info.column}
          updateMyData={updateMyData}
        />
      ),
    },
    {
      accessorKey: 'nombre',
      header: 'Nombre',
      cell: (info: CellContext<Jugador, any>) => (
        <EditableCell
          value={info.getValue()}
          row={info.row}
          column={info.column}
          updateMyData={updateMyData}
        />
      ),
    },
    {
      accessorKey: 'posicion',
      header: 'Posición',
      cell: (info: CellContext<Jugador, any>) => (
        <EditableCell
          value={info.getValue()}
          row={info.row}
          column={info.column}
          updateMyData={updateMyData}
        />
      ),
    },
    {
      accessorKey: 'numero',
      header: 'Número',
      cell: (info: CellContext<Jugador, any>) => (
        <EditableCell
          value={Number(info.getValue())}
          row={info.row}
          column={info.column}
          updateMyData={updateMyData}
        />
      ),
    },
    {
      accessorKey: 'celular',
      header: 'Celular',
      cell: (info: CellContext<Jugador, any>) => (
        <EditableCell
          value={info.getValue()}
          row={info.row}
          column={info.column}
          updateMyData={updateMyData}
        />
      ),
    },
    {
      accessorKey: 'eps',
      header: 'Eps',
      cell: (info: CellContext<Jugador, any>) => (
        <EditableCell
          value={info.getValue()}
          row={info.row}
          column={info.column}
          updateMyData={updateMyData}
        />
      ),
    },
    {
      accessorKey: 'edad',
      header: 'Edad',
      cell: (info: CellContext<Jugador, any>) => (
        <EditableCell
          value={info.getValue()}
          row={info.row}
          column={info.column}
          updateMyData={updateMyData}
        />
      ),
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <Button colorScheme="red" onClick={() => {
          handleDeleteClick(row.original);
          setFilaSelected(row.index);
        }}>
          Eliminar
        </Button>
      ),
    },
  ];

  const handleDeleteClick = (player: any) => {
    setPlayerToDelete(player);
    onOpen();
  };

  const confirmDelete = () => {
    if (playerToDelete) {
      if (playerToDelete.id) {
        deleteMutation.mutate(playerToDelete.id);
      } else {
        setData(data.filter((_, index) => index !== filaSelected));
      }
    }
    onClose();
  };

  const descargarPlantilla = () => {
    const url = '/src/assets/plantilla.xlsx'; // Ruta de la plantilla de archivo Excel

    axios.get(url, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'plantilla.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error('Error al descargar la plantilla:', error);
      });
  }

  const renderSortIcon = (isSorted: string | false) => {
    if (isSorted === 'asc') return <FaSortUp />;
    if (isSorted === 'desc') return <FaSortDown />;
    return <FaSort />;
  };

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <Button colorScheme="teal" onClick={handleAddRow}>
          Agregar Jugador
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Enviar Datos
        </Button>
        <Button leftIcon={<SiMicrosoftexcel />} onClick={descargarPlantilla}>
          Descargar plantilla
        </Button>
      </HStack>
      <FileUpload onFileUpload={handleFileUpload} />

      <HStack spacing={4}>
        <Input
          placeholder="Buscar..."
          onChange={handleSearchChange}
        />
        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="posicion">Posición</option>
        </Select>
      </HStack>
      <Box overflowX="auto">
        <Table variant="striped" colorScheme='teal'>
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th key={header.id} className='cursor-pointer' onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {renderSortIcon(header.column.getIsSorted())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Estás seguro de que quieres eliminar a {playerToDelete?.nombre}?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={confirmDelete}>
              Eliminar
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

const EditableCell: FC<EditableCellProps> = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input width="140px" value={value} onChange={onChange} onBlur={onBlur} />;
};

export default EditableTable;
