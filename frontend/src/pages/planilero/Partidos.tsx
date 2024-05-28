import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Grid } from '@chakra-ui/react';
import instance from '../../api/axios';
import { PartidoType } from '../../interfaces/marcador';
import Layout from '../../components/layout/Layout';
import { Partido } from '../../components/planillero/Partido';


const Partidos: React.FC = () => {
  const [partidos, setPartidos] = useState<PartidoType[]>([]);
  // const navigate = useNavigate();
   
  useEffect(() => {
    const getPartidos = async () => {
       const response = await instance.get('/partidos',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asume que el token está almacenado en localStorage
        },
       })
       console.log(response,"response partidos")
       setPartidos(response.data)
    }
    getPartidos()
  }, [])




  return (
    <Layout>
   <Box display="flex" flexWrap="wrap">
    {
      partidos.map( partido => (
        <Partido key={partido.id} {...partido}/>
      ))
    }
    
   </Box>
   </Layout>
  );
};

export default Partidos;
