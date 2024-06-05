import { Route } from '../../utils/routes';

export interface SearchSlice {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Route[];
  setSearchResults: (results: Route[]) => void;
}



export const createSearchSlice =(set: any): SearchSlice => ({
    searchTerm: '',
    setSearchTerm: (term) => set({ searchTerm: term }),
    searchResults: [],
    setSearchResults: (results) => set({ searchResults: results }),

})