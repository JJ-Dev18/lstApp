import axios, { AxiosError } from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';

// Definir la interfaz del estado de errores
export interface ErrorState {
  handleError: (error: unknown) => void;
  error : string | null
}

const {toast} = createStandaloneToast();
// Crear el store de Zustand
export const createErrorSlice  = (set:any) :ErrorState => ({
  
    error : null,
    handleError: (error: unknown) => {
    // const toast = useToast();
      console.log('handleError called'); // Log para verificar si la función se llama
      let errorMessage = 'Ocurrió un error desconocido';
  
      if (axios.isAxiosError(error)) {
        console.log('Axios error detected'); // Log para verificar si es un error de Axios
        const response = (error as AxiosError).response;
        
        if (response && response.data && Array.isArray((response.data as any).errors)) {
          // Manejar errores de validación de express-validator
          errorMessage = (response.data as any).errors.map((err: any) => err.msg).join(', ');
        } else {
          const status = response?.status;
  
          switch (status) {
            case 413:
              errorMessage =  (error.response?.data) ? error.response.data.message : 'El tamaño de la carga de la solicitud es demasiado grande. Por favor, reduzca el tamaño y vuelva a intentarlo.';

              break;
            case 400:
              errorMessage = (error.response?.data) ? error.response.data.message : 'Ocurrio un error en la validacion de los campos';
              break;  
            case 404:
              errorMessage = (error.response?.data) ? error.response.data.message : 'El recurso solicitado no fue encontrado.';
              break;
            case 500:
              errorMessage = (error.response?.data) ? error.response.data.message : 'Error interno del servidor. Por favor, inténtelo de nuevo más tarde.';
              break;
            // Añade otros códigos de estado según tus necesidades
            default:
              errorMessage = `Ocurrió un error inesperado: ${status}`;
          }
        }
      } else if (error instanceof Error) {
        errorMessage = `Error al configurar la solicitud: ${error.message}`;
      }
    set({error: errorMessage})
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  },
});