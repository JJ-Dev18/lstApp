import { Button, FormLabel, Input, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Alert, useToast, } from '@chakra-ui/react';
import useStore from '../../store/store';
import ImgLogin from '../../assets/login/login.webp'

export interface Alert {
  visible : boolean;
  message : string 
}


export default function Login2() {
    const [username , setUsername] = useState('planillero1@example.com');
    const [password, setPassword ] = useState('planillero123');
    const { login : dispatchLogin, token , user } = useStore((state) => state);
  
    
    const toast = useToast()
    // const {colorMode} = useColorMode()
    // const formWidth = useBreakpointValue({ base: '90%', md: '400px' });
    const navigate = useNavigate();
   
  
    useEffect(() => {
      if (token) {
        console.log('hay token')
        switch (user?.rol) {
          case 'administrador':
            navigate('/admin/dashboard');
            break;
          case 'planillero':
            navigate('/planillero');
            break;
          case 'espectador':
            navigate('/espectador');
            break;
          default:
            navigate('/inicio');
            break;
        }
      }
      
    }, [token]);
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()  
      
        try {
          await dispatchLogin(username,password);
         
          switch (user?.rol) {
            case 'administrador':
              navigate('/admin/dashboard');
              break;
            case 'planillero':
              navigate('/planillero');
              break;
            case 'espectador':
              navigate('/espectador');
              break;
            default:
              navigate('/inicio');
              break;
          }
        } catch (error:any) {
          console.log(error)
          toast({
            title: 'Login failed',
            description: error.message || 'Invalid username or password.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
  
    
    };
  return (
    <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#4b6cb7] to-[#182848] px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Bienvenido de vuelta</h1>
            <p className="text-lg text-gray-300">Inicia sesión para acceder a tu cuenta.</p>
          </div>
          <form onSubmit={handleSubmit}className="space-y-4">
            <div  className="space-y-2">
              <FormLabel className="text-gray-300" htmlFor="username">
                Usuario
              </FormLabel>
              <Input
                className="bg-gray-800 text-white placeholder:text-gray-400"
                id="username"
                placeholder="Ingresa tu usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-gray-300" htmlFor="password">
                  Contraseña
                </FormLabel>
                <Link className="text-sm font-medium text-[#00d8ff] hover:underline" href="#">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                className="bg-gray-800 text-white placeholder:text-gray-400"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                type="password"
              />
            </div>
            <Button  className="w-full bg-[#00d8ff] text-gray-900 hover:bg-[#00b7d8]" type="submit">
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          alt="Imagen futurista"
          className="h-full w-full object-cover"
          height="800"
          src={ImgLogin}
          style={{
            aspectRatio: "800/800",
            objectFit: "cover",
          }}
          width="800"
        />
      </div>
    </div>
  )
}