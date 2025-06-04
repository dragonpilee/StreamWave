import React, { useState } from 'react';
import { FilterOptions } from '@/types';

interface FilterPanelProps {
  countries: string[];
  languages: string[];
  categories: string[];
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  countries,
  languages,
  categories,
  onFilterChange,
  initialFilters = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const handleFilterChange = (
    type: 'country' | 'language' | 'category',
    value: string
  ) => {
    const newFilters = { ...filters };
    
    if (type === 'country') {
      newFilters.country = value === '' ? undefined : value;
      // Automatically select Malayalam when India is chosen
      if (value === 'India') {
        newFilters.language = 'Malayalam';
      } else if (value !== '') {
        // Clear language when selecting other countries
        newFilters.language = undefined;
      }
    } else if (type === 'language') {
      newFilters.language = value === '' ? undefined : value;
    } else if (type === 'category') {
      newFilters.category = value === '' ? undefined : value;
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div style={{ 
      backgroundColor: 'transparent', 
      borderRadius: '0.5rem', 
      overflow: 'hidden'
    }}>
      <div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          <div>
            <label 
              style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: 'white' }} 
              htmlFor="country-filter"
            >
              Country
            </label>
            <select
              id="country-filter"
              style={{ 
                width: '100%',
                backgroundColor: 'rgb(55, 65, 81)',
                border: '1px solid rgb(75, 85, 99)',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
                color: 'white'
              }}
              value={filters.country || ''}
              onChange={(e) => handleFilterChange('country', e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label 
              style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: 'white' }} 
              htmlFor="language-filter"
            >
              Language
            </label>
            <select
              id="language-filter"
              style={{ 
                width: '100%',
                backgroundColor: 'rgb(55, 65, 81)',
                border: '1px solid rgb(75, 85, 99)',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
                color: 'white'
              }}
              value={filters.language || ''}
              onChange={(e) => handleFilterChange('language', e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label 
              style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: 'white' }} 
              htmlFor="category-filter"
            >
              Category
            </label>
            <select
              id="category-filter"
              style={{ 
                width: '100%',
                backgroundColor: 'rgb(55, 65, 81)',
                border: '1px solid rgb(75, 85, 99)',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
                color: 'white'
              }}
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleClearFilters}
            style={{ 
              color: 'rgb(96, 165, 250)',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
