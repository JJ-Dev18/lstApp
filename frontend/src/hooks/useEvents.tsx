import { useEffect, useState } from "react";
import { Equipo, EventoType, PartidoType } from "../interfaces/marcador";
import useSocket from "./useSocket";
import instance from "../api/axios";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { estadoPartido } from "../interfaces/partido";
import {  useNavigate } from "react-router-dom";
import { actualizarPosiciones } from "../api/admin/posiciones";
import useStore from "../store/store";

type Equipos = {
    equipo1 : Equipo
    equipo2 : Equipo
  }

  type Marcador = {
    marcadorEquipo1 : number;
    marcadorEquipo2 : number 
  }

export const useEvent = (partidoId? : string) => {
    const { socket, isConnected } = useSocket(); 
    const navigate = useNavigate()
    const torneo = useStore( (state) => state.torneo)
    
    const [time, settime] = useState(0)
    const [fecha, setfecha] = useState('')
    const [planillero, setPlanillero] = useState('')
    const [equipos, setEquipos] = useState<Equipos | null>(null)
    const [marcador, setmarcador] = useState<Marcador>({
      marcadorEquipo1: 0 ,
      marcadorEquipo2: 0
    })
    const [isPaused, setIsPaused] = useState(JSON.parse(localStorage.getItem("isPaused") || "true"));
    const [maxTimeReached, setMaxTimeReached] = useState(false)
    const queryClient = useQueryClient();
    const toast = useToast()
  

  const fetchEvents = async () => {
    const { data } = await instance.get(`/partidos/${partidoId}`);
    setEquipos({
      equipo1: data.equipo1,
      equipo2: data.equipo2
    });
    setmarcador({
      marcadorEquipo1: data.marcadorEquipo1,
      marcadorEquipo2: data.marcadorEquipo2
    });
    setfecha(new Date(data.fecha).toLocaleString());
    setPlanillero(data.planillero.usuario.nombre)
    return data.eventos;
  };
  const { data: events = [] } = useQuery({ queryKey : ['events', partidoId], queryFn: fetchEvents,
    enabled: !!partidoId
  });

  const addEvent = async (newEvent: EventoType): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (socket) {
        socket.emit('register', newEvent, (response: { status: string; evento?: any; error?: string }) => {
          if (response.status === 'success' && response.evento) {
            
            resolve();
          } else {
            console.log(response.error)
            reject(response.error);
          }
        });
      } else {
        reject('Socket is not connected');
      }
    });
  };

  const newEventMutation = useMutation( {
    mutationFn : addEvent,
    onSuccess: () => {
      toast({
        title: 'Evento agregado.',
        description: 'El evento ha sido agregado correctamente',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey : ['events', partidoId]});
    },
    onError: (error:any) => {
      toast({
        title: `Error al agregar evento`,
        description:  error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey : ['events', partidoId]});
    }
  });

  const deleteEvent = async (eventId?: number) => {
 
    if (socket) {
      socket.emit('deleteEvent', { eventId, partidoId }, (response: { status: string; evento?: any; error?: string }) => {
        if (response.error) {
          console.error('Error deleting event:', response.error);
        } else {
          console.log('Event deleted successfully:', response.evento);
        }
      });
    }
  };

  const deleteEventMutation = useMutation({
    mutationFn : deleteEvent,
    onSuccess: () => {
      toast({
        title: 'Evento eliminado.',
        description: 'El evento ha sido eliminado correctamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      // queryClient.invalidateQueries({queryKey:  ['events', partidoId]});
    }
  });

  const actualizarPosicionesMutate = useMutation({
     mutationFn : () => actualizarPosiciones(Number(partidoId)),
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey :['tablaDePosiciones', torneo?.id]});
     
      
       toast({
         title: 'Posiciones actualizadas.',
         status: 'success',
         duration: 5000,
         isClosable: true,
       });
     },
     onError: () => {
       toast({
         title: 'Error actualizando posiciones.',
         status: 'error',
         duration: 5000,
         isClosable: true,
       });
     },
   });


  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', { partidoId });
    }
  }, [socket, partidoId]);


  useEffect(() => {
    if (socket) {
      const handleNewEvent = (event: EventoType) => {
        queryClient.setQueryData(['events', partidoId], (oldEvents: EventoType[] = []) => [...oldEvents, event]);
        console.log('se agrego un evento desde otro lado ')
     
      };
     
      socket.on('newEvent', handleNewEvent);
    

      return () => {
        socket.off('newEvent', handleNewEvent);
      
      };
    }
  }, [socket, partidoId, queryClient]);
 

  useEffect(() => {
    if (socket) {
      
      const handleDeleteEvent = ({ eventId }: { eventId: number }) => {
        console.log('se elimino un evento desde otro lado ')
        queryClient.setQueryData(['events', partidoId], (oldEvents: EventoType[] = []) =>
          oldEvents.filter(event => event.id !== eventId)
        );
      };
     
      socket.on('eventDeleted', handleDeleteEvent);

      return () => {
        
        socket.off('eventDeleted', handleDeleteEvent);
      };
    }
  }, [socket, partidoId, queryClient]);


  useEffect(() => {
    if (socket) {
      const updateScore = (partido: PartidoType) => {
         setmarcador({
          marcadorEquipo1 : partido.marcadorEquipo1,
          marcadorEquipo2 : partido.marcadorEquipo2
         })
      };

      socket.on('updateScore', updateScore);

      // Clean up the listener when the component unmounts or when socket changes
      return () => {
        socket.off('updateScore', updateScore);
      };
    }
  }, [socket]);
 

  useEffect(() => {
    if(socket){
      socket.on('timeUpdate', (data:any)=> {
       
        settime(data.time)
       
      });
      return () => {
        socket.off('timeUpdate', () => {});
        
      };
    }else{
      console.log('no hay socket')
    }
  }, [socket,partidoId]);
  
  useEffect(() => {
    if(socket){
      socket.on('maxTimeReached', ()=> {
        setMaxTimeReached(true)
        // setIsPaused(true)
        toast({
          title: 'Tiempo Completado',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
      });
      return () => {
        socket.off('maxTimeReached', () => {});
      };
    }else{
      console.log('no hay socket')
    }
  }, [socket,partidoId]);

  const startTimer =  () => {
    if(socket){
      console.log(time,"time")
     
      socket.emit('startTimer', { partidoId });
      localStorage.setItem("isPaused", JSON.stringify(false));
    }
  };

  const pauseTimer = () => {
    if(socket){
     
      socket.emit('pauseTimer', { partidoId });
      localStorage.setItem("isPaused", JSON.stringify(true));

    }
  };

  // const resetTimer = () => {
  //   if(socket){
      
  //     socket.emit('resetTimer', { partidoId });
  //   }
  // };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const handleSubmit = (player:number,comment : string, event: string) => {
   
    if(isPaused){
      toast({
        title: "El tiempo esta en pausa"
      })
      return;
    }
    const eventData: EventoType = {
      tipo: event,
      jugadorId: Number(player),
      tiempo: formatTime(time),
      partidoId: Number(partidoId),
      comentario : comment,
    };
    newEventMutation.mutate(eventData);
   
  };
  const handleDelete = (eventId?: number) => {
    deleteEventMutation.mutate(eventId);
  };
  const handleTimerActions =  async () => {
    if(time == 0){
        console.log('tiempo 0')
        await instance.put(`/partidos/estado/${partidoId}`,{
          estado : estadoPartido.ENCURSO
        })
        if (isPaused) {
          startTimer();
        } else {
          pauseTimer();
        }
   }else{
    if (isPaused) {
      startTimer();
    } else {
      pauseTimer();
    }
   }
    setIsPaused(!isPaused);
 }
 const terminarPartido = async ()=> {
  await instance.put(`/partidos/estado/${partidoId}`,{
   estado : estadoPartido.JUGADO
 })
 actualizarPosicionesMutate.mutate()


 toast({
  title: 'Partido Terminado',
  status: 'success',
  duration: 5000,
  isClosable: true,
})
 navigate('/planillero/partidos')
}
  return {
    fecha,
    events,
    equipos,
    marcador,
    time,
    isConnected,
    handleSubmit,
    startTimer,
    pauseTimer,
    maxTimeReached,
    planillero,
    handleDelete,
    handleTimerActions,
    isPaused,
    terminarPartido,
    actualizarPosicionesMutate
  }
}