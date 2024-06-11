import instance from "../api/axios"

export const fetcher = async (url:string) => {
  const { data } = await instance.get(url)
  return data 

}