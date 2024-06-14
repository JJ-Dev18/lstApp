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
  export const fetchEquiposDisponibles = async (categoryId: number) => {
    const { data } = await instance.get(`/grupos/equipos-disponibles/${categoryId}`);
    return data;
  };
export  const createEquipo = async (id:string | undefined,newEquipment: Partial<Equipment>) => {
  const formData = new FormData(); 
  formData.append('nombre', String(newEquipment.nombre));
  formData.append('categoriaId', String(newEquipment.categoriaId));
  formData.append('logo', newEquipment.logo);

  const response = await instance.post(`/equipos/torneo/${id}`, formData);
    return response.data;
  };
export const updateEquipo = async (id: string,updatedEquipment: Partial<Equipment>) =>{
 
  const formData = new FormData(); 
  console.log(updatedEquipment,"updatedequpment")
  formData.append('nombre', String(updatedEquipment.nombre));
  formData.append('categoriaId', String(updatedEquipment.categoriaId));
  formData.append('logo', updatedEquipment.logo);
  await instance.put(`/equipos/torneo/${id}`,formData)
}
export  const deleteEquipo = async (id: string): Promise<void> => {
    await instance.delete(`/equipos/torneo/${id}`);
  };