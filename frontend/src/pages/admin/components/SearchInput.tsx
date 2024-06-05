import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/store';
import searchRoutes from '../../../utils/search';

type Props = {
  className? : string 
}

const SearchInput: React.FC<Props> = ({className}) => {
  const { searchTerm, setSearchTerm, setSearchResults } = useStore();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const results = searchRoutes(searchTerm);
    setSearchResults(results);
  }, [searchTerm, setSearchResults]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowResults(true);
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    setShowResults(false);
    setSearchTerm('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full mr-2 max-w-md ${className}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setShowResults(true)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg"
        >
          {useStore.getState().searchResults.length > 0 ? (
            useStore.getState().searchResults.map((result) => (
              <div
                key={result.path}
                className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(result.path)}
              >
                <p className="text-sm font-medium text-gray-900">{result.name}</p>
                <p className="text-sm text-gray-500">{result.description}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
