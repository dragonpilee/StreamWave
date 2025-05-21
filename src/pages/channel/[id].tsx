import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Channel } from '@/types';
import { fetchAndParsePlaylist } from '@/utils/m3uParser';
import VideoPlayer from '@/components/VideoPlayer';

export default function ChannelPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const channels = await fetchAndParsePlaylist();
        const foundChannel = channels.find(c => c.id === id);
        
        if (foundChannel) {
          setChannel(foundChannel);
        } else {
          setError('Channel not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load channel information');
        setLoading(false);
        console.error(err);
      }
    };

    fetchChannel();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          <p>{error || 'Channel information not available'}</p>
        </div>
        <Link href="/" className="inline-block bg-primary px-4 py-2 rounded-lg text-white hover:bg-blue-700">
          Back to channels
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{channel.name} - StreamWave.TV</title>
        <meta name="description" content={`Watch ${channel.name} live stream`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-6 text-blue-400 hover:underline">
          ← Back to all channels
        </Link>

        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 bg-gray-700">
            <div className="flex items-center">
              {channel.logo && (
                <div className="mr-4">
                  <img 
                    src={channel.logo} 
                    alt={`${channel.name} logo`}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/logo192.svg';
                    }}
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{channel.name}</h1>
                <div className="text-gray-400">
                  {channel.group && <span className="mr-3">{channel.group}</span>}
                  {channel.country && <span className="mr-3">{channel.country}</span>}
                  {channel.language && <span>{channel.language}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="video-container">
            <VideoPlayer url={channel.url} title={channel.name} />
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Channel Information</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
              {channel.tvg?.name && (
                <>
                  <dt className="font-semibold">TVG Name:</dt>
                  <dd>{channel.tvg.name}</dd>
                </>
              )}
              {channel.tvg?.id && (
                <>
                  <dt className="font-semibold">TVG ID:</dt>
                  <dd>{channel.tvg.id}</dd>
                </>
              )}
              <dt className="font-semibold">Category:</dt>
              <dd>{channel.group || 'Uncategorized'}</dd>
              {channel.country && (
                <>
                  <dt className="font-semibold">Country:</dt>
                  <dd>{channel.country}</dd>
                </>
              )}
              {channel.language && (
                <>
                  <dt className="font-semibold">Language:</dt>
                  <dd>{channel.language}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
