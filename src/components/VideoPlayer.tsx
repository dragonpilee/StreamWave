import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Import Video.js on the client side
    const initializePlayer = async () => {
      if (typeof window !== 'undefined' && videoRef.current) {
        try {
          const videojs = (await import('video.js')).default;
          const player = videojs(videoRef.current, {
            controls: true,
            autoplay: false,
            preload: 'auto',
            fluid: true,
            responsive: true,
            playbackRates: [0.5, 1, 1.5, 2],
            html5: {
              hls: {
                enableLowInitialPlaylist: true,
                smoothQualityChange: true,
                overrideNative: true,
              },
              nativeAudioTracks: false,
              nativeVideoTracks: false,
            },
            sources: [{
              src: url,
              type: getSourceType(url),
            }],
          });

          // Add vjs-theme-iptv class to customize the player
          player.addClass('vjs-theme-iptv');

          return () => {
            if (player) {
              player.dispose();
            }
          };
        } catch (error) {
          console.error('Error initializing video player:', error);
        }
      }
    };

    initializePlayer();
  }, [url]);

  // Determine the source type based on the URL
  const getSourceType = (url: string): string => {
    if (url.includes('.m3u8')) {
      return 'application/x-mpegURL';
    } else if (url.includes('.mpd')) {
      return 'application/dash+xml';
    } else if (url.includes('.mp4')) {
      return 'video/mp4';
    } else {
      // Default to HLS as it's common for IPTV streams
      return 'application/x-mpegURL';
    }
  };

  return (
    <div ref={playerContainerRef} className="video-player-container">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          controls
          preload="auto"
          poster="/logo192.svg"
          title={title}
        >
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that supports HTML5 video
          </p>
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
