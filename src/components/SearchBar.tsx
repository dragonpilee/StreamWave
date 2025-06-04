import React, { useState, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Use debounce to prevent too many searches while typing
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function(...args: any[]) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search channels..."
          className="search-input"
          style={{ 
            backgroundColor: 'rgb(31, 41, 55)', 
            color: 'white',
            border: '1px solid rgb(55, 65, 81)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem'
          }}
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{ 
            position: 'absolute', 
            right: '0.25rem', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'rgb(156, 163, 175)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            width: '1.5rem',
            height: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            const button = e.currentTarget;
            button.style.color = 'rgb(255, 255, 255)';
            button.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            const button = e.currentTarget;
            button.style.color = 'rgb(156, 163, 175)';
            button.style.background = 'none';
          }}
        >
          <svg 
            style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
