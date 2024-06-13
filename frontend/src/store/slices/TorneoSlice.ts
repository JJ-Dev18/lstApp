import instance from "../../api/axios";

export interface TorneoSelected {
    id : number,
    nombre : string,
  categorias: number,
  equipos: number,
  jugadores: number
}

export interface TorneoSlice {
    torneo: TorneoSelected | null,
    setTorneo: (torneo:TorneoSelected) => void
    setOpenForm : (openForm:boolean) => void 
    openForm : boolean;
    crearTorneo : (data:any) => void 
}
const parseTorneo = (value:any) => {
  try {
      return value ? JSON.parse(value) : null;
  } catch (e) {
      console.error('Error parsing torneo from localStorage', e);
      return null;
  }
};

export const createTorneoSlice = (set: any, get : any): TorneoSlice => ({

    torneo: parseTorneo(localStorage.getItem('torneo')) || null,
    setTorneo: (torneo) => {
      set({ torneo })
      localStorage.setItem('torneo', JSON.stringify(torneo));
      },
    openForm : false,
    setOpenForm : (openForm) => set({openForm }),
    crearTorneo : async (data: any) => {
        const { user , setTorneo , setUser } = get()
        // const toast = useToast()
        try {
            console.log(user,"user")
         const response =  await instance.post(`/torneos/${user?.id}`, data);
         setTorneo(response.data)
         localStorage.setItem('torneo', response.data);
         if (user) {
            setUser({ ...user, torneos: 1 });
          }
        //  setUser({...user,torneos : 1 })
         console.log(response,"response create torneos")
        //   toast({
        //     title: 'Torneo creado con éxito.',
        //     status: 'success',
        //     duration: 5000,
        //     isClosable: true,
        //   });
        } catch (error:any) {
          console.error(error);
        //   toast({
        //     title: 'Error al crear el torneo.',
        //     description: error.response?.data?.error || 'Hubo un problema al crear el torneo.',
        //     status: 'error',
        //     duration: 5000,
        //     isClosable: true,
        //   });
        }
      }

})