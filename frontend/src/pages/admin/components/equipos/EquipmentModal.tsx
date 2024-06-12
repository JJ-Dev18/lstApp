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
  const [ logo, setLogo] = useState<File | null>(null);
  const [src, setsrc] = useState('')
  // const [jugadores, setPlayerCount] = useState<number>(equipment?.jugadores || 0);
  const [categoriaId, setCategoryId] = useState<string>(equipment?.categoriaId || '');
  console.log(logo,"logo")
  useEffect(() => {
    if (equipment) {
      setName(equipment.nombre);
      setsrc(equipment.logo)
      // setLogo(equipment.logo)
      // setPlayerCount(equipment.jugadores);
      setCategoryId(equipment.categoriaId);
    } else {
      setName('');
      setsrc('')
      // setPlayerCount(0);
      setCategoryId(categories.length > 0 ? categories[0].id : '');
    }
  }, [equipment]);

  const handleSave = () => {
    const newEquipment: Partial<Equipment> = {
      nombre,
     
      categoriaId,
      logo: logo ? logo : equipment?.logo,
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
          <FormControl mt={4} textAlign="center">
                <FormLabel>Logo</FormLabel>
                <img src={src} alt="logo equipo" />
                
                
                <Input type="file" onChange={(e) => {
                  if(e.target.files){
                    let src = URL.createObjectURL(e.target.files[0])
                    setsrc(src)
                  }
                  setLogo(e.target.files?.[0] || null)
                }} />
                
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Categoría</FormLabel>
                <Select value={categoriaId} onChange={(e) => setCategoryId(e.target.value)}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.nombre}</option>
                  ))}
                 
                </Select>
              </FormControl>
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
