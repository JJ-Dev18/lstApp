import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Category, Equipment } from '../../../../interfaces/equipo';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment?: Equipment | null;
  categories: Category[];
  onSave: (equipment: Partial<Equipment>) => void;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({ isOpen, onClose, equipment, categories, onSave }) => {
  const [nombre, setName] = useState(equipment?.nombre || '');
  // const [ setLogo] = useState<File | null>(null);
  const [jugadores, setPlayerCount] = useState<number>(equipment?.jugadores || 0);
  const [categoriaId, setCategoryId] = useState<string>(equipment?.categoriaId || '');

  useEffect(() => {
    if (equipment) {
      setName(equipment.nombre);
      setPlayerCount(equipment.jugadores);
      setCategoryId(equipment.categoriaId);
    } else {
      setName('');
      setPlayerCount(0);
      setCategoryId(categories.length > 0 ? categories[0].id : '');
    }
  }, [equipment]);

  const handleSave = () => {
    const newEquipment: Partial<Equipment> = {
      nombre,
     
      categoriaId,
    //   logo: logo ? URL.createObjectURL(logo) : equipment?.logo,
    };
    onSave(newEquipment);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{equipment ? 'Editar Equipo' : 'Agregar Equipo'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input value={nombre} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          {!equipment && (
            <>
              {/* <FormControl mt={4}>
                <FormLabel>Logo</FormLabel>
                <Input type="file" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
              </FormControl> */}
              <FormControl mt={4}>
                <FormLabel>Cantidad de Jugadores</FormLabel>
                <Input type="number" value={jugadores} onChange={(e) => setPlayerCount(Number(e.target.value))} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Categoría</FormLabel>
                <Select value={categoriaId} onChange={(e) => setCategoryId(e.target.value)}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.nombre}</option>
                  ))}
                 
                </Select>
              </FormControl>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EquipmentModal;
