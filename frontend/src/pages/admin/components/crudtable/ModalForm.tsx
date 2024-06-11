import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input,
  Button, NumberInput, NumberInputField, Select
} from '@chakra-ui/react';

interface ColumnConfig {
  name: string;
  type: string;
  nested?: string;
}

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  columns: ColumnConfig[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNumberChange: (name: string, value: string) => void;
  handleSubmit: () => void;
  selectData: { [key: string]: any[] };
  model: string;
  editingId: number | null | undefined;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen, onClose, formData, columns, handleChange, handleNumberChange,
  handleSubmit, selectData, model, editingId
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              ) : col.type === 'select' ? (
                <Select
                  name={col.name}
                  value={formData[col.name] || ''}
                  onChange={handleChange}
                >
                  {selectData[col.name]?.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
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
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
