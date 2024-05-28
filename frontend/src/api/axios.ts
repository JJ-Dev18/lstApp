import axios from 'axios';

const instance = axios.create({
     baseURL:   import.meta.env.VITE_API_URL, 
  

  // La URL de tu backend
});

// Puedes agregar interceptores de solicitud/respuesta aquí si es necesario

export default instance;
