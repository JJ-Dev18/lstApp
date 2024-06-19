import axios from 'axios';
import useStore from '../store/store';

const instance = axios.create({
     baseURL:   import.meta.env.VITE_API_URL, 
  

  // La URL de tu backend
});

// Interceptor para añadir el token a cada petición
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') // O de donde obtengas tu token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el servidor responde con un 401 Unauthorized, cerrar la sesión
      useStore.getState().logout();
      console.log('sesion cerrada ')
      // logout();
    }
    return Promise.reject(error);
  }
)

export default instance


// Puedes agregar interceptores de solicitud/respuesta aquí si es necesario


