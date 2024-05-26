import axios from 'axios';

const instance = axios.create({
  baseURL:   import.meta.env.VITE_API_URL, 
  
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asume que el token está almacenado en localStorage
    },
  // La URL de tu backend
});

// Puedes agregar interceptores de solicitud/respuesta aquí si es necesario

export default instance;
