import React from 'react';
import Link from 'next/link';
import { Channel } from '@/types';

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  return (
    <Link 
      href={`/channel/${channel.id}`} 
      className="channel-card" 
      style={{ 
        display: 'block', 
        textDecoration: 'none', 
        color: 'inherit' 
      }}
    >
      <div style={{ padding: '1rem' }}>
        <div style={{ 
          aspectRatio: '16/9', 
          backgroundColor: 'rgb(55, 65, 81)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '0.75rem', 
          borderRadius: '0.25rem', 
          overflow: 'hidden' 
        }}>
          {channel.logo ? (
            <img 
              src={channel.logo} 
              alt={`${channel.name} logo`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                padding: '0.75rem' 
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/logo192.svg';
              }}
            />
          ) : (
            <div style={{ fontSize: '3rem', color: 'rgb(107, 114, 128)' }}>
              <svg style={{ width: '3rem', height: '3rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <h3 style={{ 
          fontWeight: '600', 
          fontSize: '1.125rem', 
          whiteSpace: 'nowrap', 
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {channel.name}
        </h3>
        <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'rgb(156, 163, 175)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {channel.group && (
              <span style={{ 
                backgroundColor: 'rgb(55, 65, 81)', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem', 
                fontSize: '0.75rem' 
              }}>
                {channel.group}
              </span>
            )}
            {channel.country && (
              <span style={{ 
                backgroundColor: 'rgb(55, 65, 81)', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem', 
                fontSize: '0.75rem' 
              }}>
                {channel.country}
              </span>
            )}
            {channel.language && (
              <span style={{ 
                backgroundColor: 'rgb(55, 65, 81)', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem', 
                fontSize: '0.75rem' 
              }}>
                {channel.language}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChannelCard;
