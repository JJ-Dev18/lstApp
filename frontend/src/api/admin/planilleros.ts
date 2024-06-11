import instance from "../axios"

export const fetchPlanilleros = async (torneoId: number | undefined) => {
    const response = await instance.get(`/planilleros/${torneoId}`)
    return response.data
}

