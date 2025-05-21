import { Channel, FilterOptions } from '@/types';

export const filterChannels = (
  channels: Channel[],
  searchQuery: string,
  filterOptions: FilterOptions
): Channel[] => {
  return channels.filter((channel) => {
    // Search by name
    const matchesSearch = searchQuery
      ? channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Filter by country
    const matchesCountry = filterOptions.country
      ? channel.country === filterOptions.country
      : true;

    // Filter by language
    const matchesLanguage = filterOptions.language
      ? channel.language === filterOptions.language
      : true;

    // Filter by category
    const matchesCategory = filterOptions.category
      ? channel.group === filterOptions.category
      : true;

    return matchesSearch && matchesCountry && matchesLanguage && matchesCategory;
  });
};

export const getUniqueValues = (
  channels: Channel[],
  property: 'country' | 'language' | 'group'
): string[] => {
  const uniqueValues = new Set<string>();
  
  channels.forEach((channel) => {
    const value = channel[property];
    if (value) {
      uniqueValues.add(value);
    }
  });
  
  return Array.from(uniqueValues).sort();
};
