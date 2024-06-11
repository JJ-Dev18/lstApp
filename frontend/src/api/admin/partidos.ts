import instance from "../axios"


export const fetchPartidos = async (torneoId : number | undefined) => {

     const response = await instance.get(`/partidos/torneo/${torneoId}`)
     return response.data
}

export const crearPartido = async (partido: any) => {
    const response = await instance.post(`/partidos`,{ ... partido})
    return response.data
}
export const updatePartido = async (partido: any) => {
    const response = await instance.put(`/partidos/${partido.id}`,{ ... partido})
    return response.data
}
export const deletePartido = async (id:number) => {
   const response = await instance.delete(`/partidos/${id}`)
   return response.data 
}