import { StateCreator, create } from 'zustand';
import { AuthSlice, createAuthSlice } from './slices/AuthSlice';
import { UserSlice, createUserSlice } from './slices/UserSlice';
import { TorneoSlice, createTorneoSlice } from './slices/TorneoSlice';
import { devtools } from 'zustand/middleware'
import { TourState, createTourSlice } from './slices/TourSlice';
import { SearchSlice, createSearchSlice } from './slices/SearchSlice';
import { UISlice, createUIslice } from './slices/UiSlice';

interface Store extends AuthSlice,UserSlice,TorneoSlice,TourState,SearchSlice,UISlice {}

const createStore: StateCreator<Store> = (set, get) => ({
  ...createAuthSlice(set,get),
  ...createUserSlice(set),
  ...createTorneoSlice(set,get),
  ...createTourSlice(set),
  ...createSearchSlice(set),
  ...createUIslice(set)
});

const useStore = create<Store>()(
  devtools(createStore) )


export default useStore;
