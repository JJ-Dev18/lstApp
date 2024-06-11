import React, { useEffect, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Input,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import {  fetchPlanilleros } from '../../../../api/admin/planilleros';
import { crearPartido, updatePartido } from '../../../../api/admin/partidos';
import { Partido } from '../../../../interfaces/partido';

interface CrearPartidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipos: any[];
  categoriaId: number;
  torneoId: number | undefined;
  partido? : Partido
}



const CrearPartidoModal: React.FC<CrearPartidoModalProps> = ({ partido,isOpen, onClose, equipos, categoriaId, torneoId }) => {
  const [equipo1Id, setEquipo1Id] = useState<number>(0);
  const [equipo2Id, setEquipo2Id] = useState<number>(0);
  const [fecha, setFecha] = useState<string>('');
  const [duracion, setDuracion] = useState<number>(0);
  const [estado, setEstado] = useState<string>('SIN_JUGAR');
  const [planilleroId, setPlanilleroId] = useState<number>(0);
  console.log(equipo1Id,"partido")
  const queryClient = useQueryClient();
  const toast = useToast()
  const { data: planilleros } = useQuery(
    {  queryFn : () => fetchPlanilleros(torneoId), queryKey : ['planilleros', torneoId]}
  );

  useEffect(() => {
    if (partido) {
        setEquipo1Id(partido.equipo1Id);
        setEquipo2Id(partido.equipo2Id);
        setFecha(partido.fecha);
        setDuracion(partido.duracion)
        setEstado(partido.estado)
        setPlanilleroId(partido.planilleroId)
    } else {
       
        setEquipo1Id(0);
        setEquipo2Id(0);
        setFecha(new Date().toISOString().slice(0, -8));
        setDuracion(120)
        setEstado("SIN_JUGAR")
        setPlanilleroId(0)
    }
  }, [partido,equipos]);

  const createMutation = useMutation(
    {
    mutationFn : crearPartido,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey : ['partidos', torneoId]});
        toast({
            title: 'Partido creado correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: 'Error al crear partido.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
    }
  );
  const updateMutation = useMutation(
    {
    mutationFn : updatePartido,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey : ['partidos', torneoId]});
        toast({
            title: 'Partido actualizado correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: 'Error al actualizar partido.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
    }
  );
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (equipo1Id && equipo2Id && categoriaId && fecha && planilleroId) {
        const formattedFecha = new Date(fecha).toISOString();
        if(partido){
            updateMutation.mutate({
                equipo1Id,
                equipo2Id,
                fecha: formattedFecha,
                duracion,
                categoriaId,
                estado,
                planilleroId,
                torneoId,
                id : partido.id
              });

        }else{
            createMutation.mutate({
            equipo1Id,
            equipo2Id,
            fecha: formattedFecha,
            duracion,
            categoriaId,
            estado,
            planilleroId,
            torneoId
          });
        }
      onClose();
    } else {
      alert('Por favor completa todos los campos');
    }
  };
  const formatDateForInput = (isoString: string) => {
    return isoString.slice(0, -8);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{partido ? 'Editar Partido' : 'Crear Partido'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <HStack>
                <Select placeholder="Seleccionar Equipo 1"  value={equipo1Id} onChange={(e) => setEquipo1Id(parseInt(e.target.value))}>
                  {equipos?.map((equipo: any) => (
                    <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                  ))}
                </Select>
                <Select placeholder="Seleccionar Equipo 2"  value={equipo2Id}  onChange={(e) => setEquipo2Id(parseInt(e.target.value))}>
                  {equipos?.map((equipo: any) => (
                    <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                  ))}
                </Select>
              </HStack>
              <Select placeholder="Seleccionar Planillero" value={planilleroId} onChange={(e) => setPlanilleroId(parseInt(e.target.value))}>
                {planilleros?.map((planillero: any) => (
                  <option key={planillero.id} value={planillero.id}>{planillero.nombre}</option>
                ))}
              </Select>
              <Input type="datetime-local"  value={fecha ? formatDateForInput(fecha) : ''} onChange={(e) => setFecha(e.target.value)} />
              <Input type="number" placeholder="Duración (minutos)" value={duracion} onChange={(e) => setDuracion(parseInt(e.target.value))} />
              <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="SIN_JUGAR">Sin jugar</option>
                <option value="EN_CURSO">En curso</option>
                <option value="JUGADO">Jugado</option>
                <option value="SUSPENDIDO">Suspendido</option>
              </Select>
              <Button type="submit" colorScheme="teal">{partido ? 'Editar Partido' : 'Crear Partido'}</Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CrearPartidoModal;
