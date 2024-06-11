import React, { ReactElement, useEffect, useState } from 'react';
import {  Button, useToast } from '@chakra-ui/react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
import SearchBar from './SearchBar';
import TableComponent from './TableComponent';
import ModalForm from './ModalForm';
import instance from '../../../../api/axios';
import useStore from '../../../../store/store';
import { AddIcon } from '@chakra-ui/icons';

export interface Action {
  name: string;
  icon: ReactElement;
  callback: (item: any) => void;
}

interface ColumnConfig {
  name: string;
  type: string;
  dataEndpoint?: string;
  mapData?: (data: any[]) => { id: number; name: string }[];
  nested?: string;
}

interface CrudTableProps {
  apiEndpoint: string;
  columns: ColumnConfig[];
  model: string;
  additionalActions?: Action[];
}

// interface TableItem {
//   id: number;
//   [key: string]: any;
// }

// const fetchData = async (apiEndpoint: string, torneoId: number | undefined) => {
//   const response = await instance.get(`${apiEndpoint}/${torneoId}`);
//   return response.data;
// };

// const fetchSelectData = async (endpoint: string, torneoId: number | undefined) => {
//   const response = await instance.get(`${endpoint}/${torneoId}`);
//   return response.data;
// };

const CrudTable: React.FC<CrudTableProps> = ({ apiEndpoint, columns, model , additionalActions}) => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const torneo = useStore((state) => state.torneo);
  const [formData, setFormData] = useState<any>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [selectData, setSelectData] = useState<{ [key: string]: any[] }>({});
  const toast = useToast();

  const fetchData = async () => {
    try {
      const response: any = await instance.get(`${apiEndpoint}/${torneo?.id}`);
      const formattedData = response.data.map((item: any) => {
        let newItem = { ...item };
        columns.forEach(col => {
          if (col.nested) {
            newItem[col.name] = newItem[col.name][col.nested];
          }
        });
        return newItem;
      });
      console.log(formattedData)
      setData(formattedData.length > 0 ? formattedData : []);
      setFilteredData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [model]);

  useEffect(() => {
    columns.forEach(col => {
      if (col.type === 'select' && col.dataEndpoint) {
        instance.get(`${col.dataEndpoint}/${torneo?.id}`).then(response => {
          const mappedData = col.mapData ? col.mapData(response.data) : response.data;
          console.log(mappedData)
          setSelectData(prevData => ({
            ...prevData,
            [col.name]: mappedData
          }));
        });
      }
    });
  }, [columns]);

  const handleOpenModal = (item: any = {}) => {
    setEditingId(item ? item.id : null);
    console.log(editingId,"item a editar")
    setFormData(item || {});
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value === '' ? '' : Number(value),
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await instance.put(`${apiEndpoint}/${editingId}`, formData);
        toast({
          title: `${model} updated successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await instance.post(`${apiEndpoint}/${torneo?.id}`, formData);
        console.log(formData,"formdata")
        toast({
          title: `${model} created successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      toast({
        title: `Error ${editingId ? 'updating' : 'creating'} ${model}.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error submitting data:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await instance.delete(`${apiEndpoint}/${id}`);
      toast({
        title: `${model} Eliminado Correctamente.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      toast({
        title: `Error Eliminando ${model}.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error deleting data:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      setFilteredData(data.filter(item => 
        columns.some(col => {
          const cellValue = item[col.name];
          return cellValue.toString().toLowerCase().includes(value.toLowerCase());
        })
      ));
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="p-4 relative" >
      <SearchBar filter={filter} handleFilterChange={handleFilterChange} model={model} />
      <TableComponent additionalActions={additionalActions} columns={columns} data={filteredData} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
      <Button 
      leftIcon={<AddIcon />} 
      colorScheme="teal" 
      aria-label={`Agregar ${model}`} 
      size="md" 
      position="fixed" 
      bottom="20px" 
      right="20px" 
      boxShadow="lg"
      onClick={() => handleOpenModal()}
    >
      {`Agregar ${model}`} 
    </Button>
      <ModalForm
        isOpen={isOpen}
        onClose={handleCloseModal}
        formData={formData}
        columns={columns}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        selectData={selectData}
        model={model}
        editingId={editingId}
      />
    </div>
  );
};

export default CrudTable;
