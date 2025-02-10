import instance from "../axios";

export const fetchGrupos = async (categoriaId: string | undefined) => {
  const response = await instance.get(`/categorias/grupos/${categoriaId}`);
  return response.data;
};

export const fetchEquiposPorGrupo = async (grupoId: string | undefined) => {
  const response = await instance.get(`/grupos/equipo/${grupoId}`);
  return response.data;
};

export const createGrupo = async (categoriaId: number, nombre: string) => {
  const response = await instance.post(`/grupos/${categoriaId}`, { nombre });
  return response.data;
};
export const deleteGrupo = async ( id:number) => {
    const response = await instance.delete(`/grupos/${id}`)
    return response.data
}
export const asociarEquipoGrupo = async ({
  equipoId,
  torneoId,
  categoriaId,
  sourceGroupId,
  destinationGroupId,
}: {
  equipoId: number;
  torneoId: number | undefined;
  categoriaId : number;
  sourceGroupId?: number;
  destinationGroupId: number | null;
}) => {
    console.log(equipoId,sourceGroupId,destinationGroupId)
  if (sourceGroupId) {
    await instance.delete(
      `/grupos/equipos-grupos/${equipoId}/${sourceGroupId}`
    );
  }
  if (destinationGroupId !== null) {
    const response = await instance.post(`/grupos/equipos-grupos`, {
      equipoId,
      grupoId: destinationGroupId,
      torneoId,
      categoriaId
    });
    console.log(response, "response");
    return response.data;
  }
};
