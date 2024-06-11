import { Equipment } from "../../interfaces/equipo";
import instance from "../axios";

export const fetchEquipos = async (torneoId: string | undefined) => {
    const response = await instance.get(`/equipos/torneo/${torneoId}`);
    return response.data;
  };
  export const fetchEquiposPorCategoria = async (categoriaId: string | undefined) => {
    const response = await instance.get(`/equipos/categoria/${categoriaId}`);
    return response.data;
  };  
 
export  const createEquipo = async (id:string | undefined,newEquipment: Partial<Equipment>) => {
    const response = await instance.post(`/equipos/torneo/${id}`, {...newEquipment});
    return response.data;
  };
export const updateEquipo = async (id: string,updatedEquipment: Partial<Equipment>) =>{
  await instance.put(`equipos/torneo/${id}`,{ ...updatedEquipment })
}
export  const deleteEquipo = async (id: string): Promise<void> => {
    await instance.delete(`/equipos/${id}`);
  };