import { Jugador } from "../../interfaces/jugador";
import instance from "../axios";

export const fetchPlayers = async (equipoId: number) => {
    const response = await instance.get(`/jugadores/equipo/${equipoId}`);
    return response.data;
  };
  
export  const createPlayers = async ({ newPlayers, equipoId }: { newPlayers: Jugador[], equipoId: number }): Promise<Jugador[]> => {
    const response = await instance.post(`/jugadores/equipo/${equipoId}`, newPlayers);
    return response.data;
  };
export  const deletePlayer = async (id: number): Promise<void> => {
    await instance.delete(`/jugadores/${id}`);
  };