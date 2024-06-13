import { useQuery } from "@tanstack/react-query";
import { fetchCategorias } from "../api/admin/categorias";
import useStore from "../store/store"


export const useCategorias = ( ) => {
  
    const torneo = useStore( (state) => state.torneo)
    const { data: categorias, isLoading: isLoadingCategorias, isError } = useQuery({
        queryKey: ["categorias", torneo?.id],
        queryFn: () => fetchCategorias(torneo?.id.toString()),
        enabled : !!torneo
      });


    return {
        categorias,
        isLoadingCategorias,
        isError
    }  
}