import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  IconButton,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EquipmentModal from "./EquipmentModal";
import { useNavigate } from "react-router-dom";
import useStore from "../../../../store/store";
import { Equipment, Category } from "../../../../interfaces/equipo";
import {
  createEquipo,
  deleteEquipo,
  fetchEquipos,
  updateEquipo,
} from "../../../../api/admin/equipos";
import { fetchCategorias } from "../../../../api/admin/categorias";
import { RiTeamFill } from "react-icons/ri";
import debounce from "lodash.debounce";

const columnHelper = createColumnHelper<Equipment>();

const EquiposTable: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const torneo = useStore((state) => state.torneo);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: equipos, isLoading: isLoadingEquipos } = useQuery({
    queryKey: ["equipos", torneo?.id],
    queryFn: () => fetchEquipos(torneo?.id.toString()),
  });
  const { data: categorias, isLoading: isLoadingCategorias } = useQuery({
    queryKey: ["categorias", torneo?.id],
    queryFn: () => fetchCategorias(torneo?.id.toString()),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteEquipo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
    },
  });
  const addMutation = useMutation({
    mutationFn: ({
      id,
      newEquipment,
    }: {
      id: string | undefined;
      newEquipment: Partial<Equipment>;
    }) => createEquipo(id, newEquipment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updatedEquipment,
    }: {
      id: string;
      updatedEquipment: Partial<Equipment>;
    }) => updateEquipo(id, updatedEquipment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
    },
  });
  const openEditModal = (equipment: Equipment | null) => {
    setSelectedEquipment(equipment);
    setModalOpen(true);
  };

  const handleSave = (newEquipment: Partial<Equipment>) => {
    if (selectedEquipment) {
      updateMutation.mutate({
        id: selectedEquipment.id,
        updatedEquipment: newEquipment,
      });
    } else {
      addMutation.mutate({
        id: torneo?.id.toString(),
        newEquipment: newEquipment,
      });
    }
    setModalOpen(false);
  };
  const debouncedSearch = useMemo(
    () =>
      debounce((value: any) => {
        setSearchTerm(value);
      }, 300),
    []
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  const filteredEquipment = useMemo(() => {
    if (!activeCategoryId || !equipos) return [];
    return equipos.filter(
      (e: Equipment) =>
        e.categoriaId === activeCategoryId &&
        e.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeCategoryId, equipos, searchTerm]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("logo", {
        header: "Logo",
        cell: (info) => <img src={info.getValue()} alt="logo" width="50" />,
      }),
      columnHelper.accessor("nombre", {
        header: "Nombre",
      }),
      columnHelper.accessor("jugadores", {
        header: "Cantidad de Jugadores",
      }),
      columnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <Box>
            <IconButton
              icon={<EditIcon />}
              onClick={() => openEditModal(row.original)}
              aria-label="Editar"
              mr={2}
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => deleteMutation.mutate(row.original.id)}
              aria-label="Eliminar"
              mr={2}
            />
            <Button
              leftIcon={<RiTeamFill />}
              onClick={() =>
                navigate(`/admin/equipos/${row.original.id}/jugadores`)
              }
            >
              Jugadores
            </Button>
          </Box>
        ),
      }),
    ],
    []
  );

  const tableInstance = useReactTable({
    data: filteredEquipment || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (categorias && categorias.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categorias[0].id);
    }
  }, [categorias]);

  if (isLoadingCategorias || isLoadingEquipos) {
    return <div>Loading...</div>;
  }
  // const renderSortIcon = (isSorted: string | false) => {
  //   if (isSorted === 'asc') return <FaSortUp />;
  //   if (isSorted === 'desc') return <FaSortDown />;
  //   return <FaSort />;
  // };
  return (
    <Box>
      <Input
        placeholder="Buscar equipo..."
        mb={4}
        onChange={handleSearchChange}
      />
      <Tabs
        variant="soft-rounded"
        colorScheme="teal"
        onChange={(index) => setActiveCategoryId(categorias[index]?.id || null)}
      >
        <TabList>
          {categorias.map((category: Category) => (
            <Tab key={category.id}>{category.nombre}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {equipos?.map((equipo: Equipment) => (
            <TabPanel key={equipo.id}>
              {filteredEquipment.length === 0 ? (
                <Text>No hay equipos para esta categoría.</Text>
              ) : (
                <TableContainer>
                  <Table>
                    <Thead>
                      {tableInstance.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <Th key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </Th>
                          ))}
                        </Tr>
                      ))}
                    </Thead>
                    <Tbody>
                      {tableInstance.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <Td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          ))}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Button onClick={() => openEditModal(null)}>Agregar nuevo</Button>
      <EquipmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        equipment={selectedEquipment}
        categories={categorias || []}
        onSave={handleSave}
      />
    </Box>
  );
};

export default EquiposTable;
