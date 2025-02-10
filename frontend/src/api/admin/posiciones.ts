import instance from "../axios";

export const actualizarPosiciones = async (partidoId: number) => {
    const response = await instance.post(`/posiciones/actualizar/${partidoId}`);
    return response.data;
};
export const fetchTablaDePosiciones = async (torneoId : number | undefined) => {
    const response = await instance.get(`/posiciones/${torneoId}`);
    return response.data;
  };