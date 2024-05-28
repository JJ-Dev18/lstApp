import { create } from 'zustand';
import instance from '../api/axios';


interface AuthSlice {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkToken: () => Promise<void>;
  error : boolean
}

const createAuthSlice = (set: any, ): AuthSlice => ({
  token: localStorage.getItem('token'),
  error : false,
  login: async (email:string,password:string) => {
    try {
      const response = await instance.post('/auth/login', { email, password });
      console.log(response.data.error,"respoinse")
      if(!response.data.error){
       
        const token = response.data.token
        localStorage.setItem('token', token);
        set({ token , error : true});
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
    set({ token: null });
  },
  checkToken: async () => {
    const token = localStorage.getItem('token');
    try {
      await instance.get('/check-token',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
    } catch (error) {
      console.error('Token check error:', error);
        localStorage.removeItem('token');
        set({ token: null });
    }
  }
});

interface Store extends AuthSlice {}

const useStore = create<Store>((set) => ({
  ...createAuthSlice(set),
}));

export default useStore;
