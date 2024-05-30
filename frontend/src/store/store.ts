import { create } from 'zustand';
import instance from '../api/axios';
import { User } from '../interfaces/auth';


interface AuthSlice {
  token: string | null;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
  checkToken: () => Promise<void>;
  error : boolean,
  user: User | null,
  setUser: (user:User) => void
}

const createAuthSlice = (set: any, get : any): AuthSlice => ({
  user: null,
  setUser: (user) => set({ user }),
  token: localStorage.getItem('token'),
  error : false,
  login: async (email:string,password:string) => {
    try {
      const response = await instance.post('/auth/login', { email, password });
       const {setUser } = get() 
      
      console.log(response.data.error,"respoinse")
      if(!response.data.error){
       
        const token = response.data.token
        const user = response.data.user
        localStorage.setItem('token', token);
        set({ token});
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
    set({ token: null });
  },
  checkToken: async () => {
    const token = localStorage.getItem('token');
    const {logout, setUser } = get() 
    try {
     const response =  await instance.get('/auth/check-token',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      set({ token });
      setUser(response.data.user)
      
      
    } catch (error) {
      console.error('Token check error:', error);
        
        // localStorage.removeItem('token');
        // set({ token: null });
        logout()
    }
  }
});

interface Store extends AuthSlice {}

const useStore = create<Store>((set,get) => ({
  ...createAuthSlice(set,get),
}));

export default useStore;
