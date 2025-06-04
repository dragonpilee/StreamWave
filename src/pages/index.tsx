import { useState, useEffect } from 'react';
import Head from 'next/head';
import { fetchAndParsePlaylist, getDefaultChannel } from '@/utils/m3uParser';
import { filterChannels, getUniqueValues } from '@/utils/filterHelpers';
import { Channel, FilterOptions } from '@/types';
import SearchBar from '@/components/SearchBar';
import ChannelList from '@/components/ChannelList';
import FilterPanel from '@/components/FilterPanel';
import VideoPlayer from '@/components/VideoPlayer';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        setLoading(true);
        const data = await fetchAndParsePlaylist();
        setChannels(data);
        // Show all channels by default, including our fallbacks
        setFilteredChannels(data);
        
        // Set the default channel for the home page player
        setSelectedChannel(getDefaultChannel());
        
        // Extract unique values for filtering
        setCountries(getUniqueValues(data, 'country').sort());
        setLanguages(getUniqueValues(data, 'language').sort());
        setCategories(getUniqueValues(data, 'group').sort());
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load IPTV playlist. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    loadPlaylist();
  }, []);

  // Apply filters when search query or filter options change
  useEffect(() => {
    if (channels.length > 0) {
      const filtered = filterChannels(channels, searchQuery, filterOptions);
      setFilteredChannels(filtered);
    }
  }, [channels, searchQuery, filterOptions]);



  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  // Function to handle channel selection
  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  return (
    <>
      <Head>
        <title>StreamWave.TV</title>
        <meta name="description" content="Stream International TV channels on StreamWave.TV" />
      </Head>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
            StreamWave.TV
          </h1>
          <p style={{ color: 'rgb(156, 163, 175)', textAlign: 'center', fontSize: '0.875rem' }}>
            Stream International Channels
          </p>
        </div>

        {/* Featured player section */}
        {selectedChannel && (
          <div style={{ marginBottom: '2rem', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: 'rgb(17, 24, 39)' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgb(31, 41, 55)' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Now Playing: {selectedChannel.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgb(156, 163, 175)', fontSize: '0.875rem' }}>
                <span>{selectedChannel.country || 'International'}</span>
                <span>•</span>
                <span>{selectedChannel.language || 'Unspecified'}</span>
                <span>•</span>
                <span>{selectedChannel.group || 'General'}</span>
              </div>
            </div>
            <div>
              <VideoPlayer url={selectedChannel.url} title={selectedChannel.name} />
            </div>
          </div>
        )}

        {/* Search and filter section */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgb(31, 41, 55)', borderRadius: '0.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Find Channels</h3>
          <div className="filter-container" style={{ 
            width: '100%',
            padding: '0.5rem 0'
          }}>
            <FilterPanel 
              countries={countries}
              languages={languages}
              categories={categories}
              onFilterChange={handleFilterChange}
              initialFilters={filterOptions}
            />
          </div>
        </div>

        {/* Channel listing section */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '14rem' }}>
            <div className="spinner" style={{ width: '3rem', height: '3rem' }}></div>
          </div>
        ) : error ? (
          <div style={{ backgroundColor: 'rgb(239, 68, 68)', color: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
            <p>{error}</p>
          </div>
        ) : filteredChannels.length === 0 ? (
          <div style={{ backgroundColor: 'rgb(31, 41, 55)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No channels found</p>
            <p style={{ color: 'rgb(156, 163, 175)', fontSize: '0.875rem' }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div>
            <ChannelList channels={filteredChannels} onChannelSelect={handleChannelSelect} />
          </div>
        )}
      </div>
    </>
  );
}
