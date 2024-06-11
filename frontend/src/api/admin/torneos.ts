import instance from "../axios";

export const fetchTorneos = async (userId: number | undefined) => {
    const response = await instance.get(`/torneos/${userId}`);
    return response.data;
  };
  
export  const deleteTournament = async (id: number | undefined) => {
    await instance.delete(`/torneos/${id}`);
  };