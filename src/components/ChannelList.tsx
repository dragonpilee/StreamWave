import React from 'react';
import { Channel } from '@/types';
import ChannelCard from './ChannelCard';

interface ChannelListProps {
  channels: Channel[];
  onChannelSelect?: (channel: Channel) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, onChannelSelect }) => {
  const handleChannelClick = (channel: Channel) => {
    if (onChannelSelect) {
      onChannelSelect(channel);
      // Scroll to the top of the page where the player is
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid-container">
      {channels.map((channel) => (
        <div 
          key={channel.id} 
          onClick={() => handleChannelClick(channel)}
          style={{ cursor: onChannelSelect ? 'pointer' : 'default' }}
        >
          <ChannelCard channel={channel} />
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
