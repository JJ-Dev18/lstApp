import { createStandaloneToast } from "@chakra-ui/react";
import instance from "../../api/axios";
import { User } from '../../interfaces/auth';

export interface AuthSlice {
    token: string | null;
    login: (username: string, password: string) => Promise<User>;
    register : ( email : string , password : string , nombre : string ) => Promise<User>
    logout: () => void;
    checkToken: () => Promise<void>;
    // error : boolean,
   
  }
const {toast} = createStandaloneToast();
  
 export const createAuthSlice = (set: any, get : any): AuthSlice => ({
   
    token: localStorage.getItem('token'),
    // error : false,
    register : async ( email : string , password : string , nombre : string ) => {
        try {
            const response = await instance.post('/auth/register', { email, password, nombre });
             const { setUser ,setLinksAdmin , setLinksPlanillero } = get() 
            
            console.log(response.data.error,"respoinse")
            if(!response.data.error){
             
              const token = response.data.token
              const user = response.data.user
              localStorage.setItem('token', token);
              set({ token});
              if(user.rol === 'administrador'){
                setLinksAdmin()
              }else{
                setLinksPlanillero()
              }
              setUser(user)
              return user;
            } else {
              throw new Error(response.data.error || 'Failed to login');
            }
            
          } catch (error) {
            console.error('Login error:', error);
            throw error;
          }
    },
    login: async (email:string,password:string) => {
      try {
        const response = await instance.post('/auth/login', { email, password });
         const { setUser , setLinksAdmin, setLinksPlanillero} = get() 
        
        
        if(!response.data.error){
         
          const token = response.data.token
          const user = response.data.user
          localStorage.setItem('token', token);
          set({ token});
          if(user.rol === 'administrador'){
            setLinksAdmin()
          }else{
            setLinksPlanillero()
          }
          setUser(user)
          return user;
        } else {
          throw new Error(response.data.error || 'Failed to login');
        }
        
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('torneo');

      set({ token: null, torneo : null, navbarOpen : false, openForm : false });
      toast({
        title: 'Sesion Cerrada',
        
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
    checkToken: async () => {
      const token = localStorage.getItem('token');
      const {logout, setUser, setLinksAdmin,setLinksPlanillero } = get() 
      try {
       const response =  await instance.get('/auth/check-token',{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        set({ token });

        setUser(response.data.user)
        if(response.data.user.rol === 'administrador'){
          setLinksAdmin()
        }else{
          setLinksPlanillero()
        }
        
        
      } catch (error) {
        console.error('Token check error:', error);
          
          // localStorage.removeItem('token');
          // set({ token: null });
          
          logout()
          
      }
    }
  });