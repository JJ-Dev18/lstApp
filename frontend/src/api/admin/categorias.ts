import instance from "../axios";


export const fetchCategorias = async (torneoId: string | undefined) => {
    const response = await instance.get(`/categorias/torneo/${torneoId}`);
    console.log(response.data)
    return response.data;
  };
  