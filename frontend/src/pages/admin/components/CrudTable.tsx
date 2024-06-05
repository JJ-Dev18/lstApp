import React, { useEffect, useState } from 'react'
import { 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, 
  IconButton, Box, useToast, InputGroup, InputLeftElement, NumberInput, NumberInputField, 
  Text
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, AddIcon, SearchIcon } from '@chakra-ui/icons'
import instance from '../../../api/axios'
import useStore from '../../../store/store'

interface CrudTableProps {
  apiEndpoint: string
  columns: { name: string, type: string }[]
  model: string
}

const CrudTable: React.FC<CrudTableProps> = ({ apiEndpoint, columns, model }) => {
  const [data, setData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const torneo = useStore( ( state ) => state.torneo)
  const [formData, setFormData] = useState<any>({})
  const [editingId, setEditingId] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>('')
  const toast = useToast()

  const fetchData = async () => {
    try {
      const response :any = await instance.get(`${apiEndpoint}/${torneo?.id}`)
      if(response.data.length > 0){
        setData(response.data)
      }else{
        setData([])
      } 
      // setData(response.data)
      setFilteredData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [model])

  const handleOpenModal = (item: any = {}) => {
    setEditingId(item ? item.id : null)
    setFormData(item || {})
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setFormData({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNumberChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value === '' ? '' : Number(value),
    })
  }

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await instance.put(`${apiEndpoint}/${editingId}`, formData)
        toast({
          title: `${model} updated successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        await instance.post(`${apiEndpoint}/${torneo?.id}`, formData)
        toast({
          title: `${model} created successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      fetchData()
      handleCloseModal()
    } catch (error) {
      toast({
        title: `Error ${editingId ? 'updating' : 'creating'} ${model}.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error submitting data:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      console.log(id,"id")
      await instance.delete(`${apiEndpoint}/${id}`)
      toast({
        title: `${model} Eliminado Correctamente.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      fetchData()
    } catch (error) {
      toast({
        title: `Error Eliminando ${model}.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error deleting data:', error)
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilter(value)
    if (value) {
      setFilteredData(data.filter(item => 
        columns.some(col => item[col.name].toString().toLowerCase().includes(value.toLowerCase()))
      ))
    } else {
      setFilteredData(data)
    }
  }

  return (
    <div className="p-4">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="4">
        <FormControl width={{ base: "100%", md: "300px" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder={`Buscar ${model}`} 
              value={filter} 
              onChange={handleFilterChange} 
            />
          </InputGroup>
        </FormControl>
      </Box>
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
          {filteredData.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length + 1}>
                  <Text textAlign="center">No informacion disponible</Text>
                </Td>
              </Tr>
            ) : (
              filteredData.map((item) => (
                <Tr key={item.id}>
                  {columns.map((col) => (
                    <Td key={col.name}>{item[col.name]}</Td>
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
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <IconButton 
        icon={<AddIcon />} 
        colorScheme="teal" 
        aria-label={`Agregar ${model}`} 
        size="lg" 
        position="fixed" 
        bottom="20px" 
        right="20px" 
        boxShadow="lg"
        onClick={() => handleOpenModal()}
      />

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingId ? `Editar ${model}` : `Agregar  ${model}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {columns.map((col) => (
              <FormControl key={col.name} isRequired mb="4">
                <FormLabel>{col.name}</FormLabel>
                {col.type === 'number' ? (
                  <NumberInput
                    value={formData[col.name] || ''}
                    onChange={(valueString) => handleNumberChange(col.name, valueString)}
                  >
                    <NumberInputField name={col.name} />
                  </NumberInput>
                ) : (
                  <Input
                    name={col.name}
                    value={formData[col.name] || ''}
                    onChange={handleChange}
                  />
                )}
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Guardar
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CrudTable
