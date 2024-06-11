import React from 'react';
import { FormControl, InputGroup, InputLeftElement, Input, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  filter: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  model: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ filter, handleFilterChange, model }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb="4">
      <FormControl width={{ base: "100%", md: "300px" }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder={`Buscar ${model}`}
            value={filter}
            onChange={handleFilterChange}
          />
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export default SearchBar;
