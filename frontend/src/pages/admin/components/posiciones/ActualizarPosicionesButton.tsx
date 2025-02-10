import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';


const ActualizarPosicionesButton: React.FC = () => {
  const [partidoId, setPartidoId] = useState<number>(0);
  const toast = useToast();
  

  return (
    <div>
      <Input
        type="number"
        value={partidoId}
        onChange={(e) => setPartidoId(Number(e.target.value))}
        placeholder="ID del Partido"
        width="200px"
        mr={2}
      />
      <Button  colorScheme="green">
        Actualizar Posiciones
      </Button>
    </div>
  );
};

export default ActualizarPosicionesButton;
