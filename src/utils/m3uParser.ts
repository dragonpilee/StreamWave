import { Channel, M3UPlaylist, M3UItem } from '@/types';

export const parseM3U = async (url: string): Promise<Channel[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch M3U file: ${response.statusText}`);
    }
    const text = await response.text();
    return parseM3UContent(text);
  } catch (error) {
    console.error('Error parsing M3U:', error);
    throw error;
  }
};

export const parseM3UContent = (content: string): Channel[] => {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  
  let currentChannel: Partial<Channel> | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines or comments
    if (!line || line.startsWith('#') && !line.startsWith('#EXTINF:')) {
      continue;
    }
    
    // Parse channel info
    if (line.startsWith('#EXTINF:')) {
      const infoLine = line.substring(8);
      const tvgMatch = infoLine.match(/tvg-id="([^"]*)"/i);
      const tvgNameMatch = infoLine.match(/tvg-name="([^"]*)"/i);
      const tvgLogoMatch = infoLine.match(/tvg-logo="([^"]*)"/i);
      const groupMatch = infoLine.match(/group-title="([^"]*)"/i);
      const countryMatch = infoLine.match(/tvg-country="([^"]*)"/i);
      const languageMatch = infoLine.match(/tvg-language="([^"]*)"/i);
      
      const nameMatch = infoLine.match(/,(.*)$/);
      const name = nameMatch ? nameMatch[1].trim() : `Channel ${channels.length + 1}`;
      
      currentChannel = {
        id: (channels.length + 1).toString(),
        name,
        logo: tvgLogoMatch ? tvgLogoMatch[1] : '',
        group: groupMatch ? groupMatch[1] : 'Undefined',
        country: countryMatch ? countryMatch[1] : undefined,
        language: languageMatch ? languageMatch[1] : undefined,
        tvg: {
          id: tvgMatch ? tvgMatch[1] : undefined,
          name: tvgNameMatch ? tvgNameMatch[1] : undefined,
        }
      };
    } 
    // Parse URL line (which follows the #EXTINF line)
    else if (currentChannel) {
      currentChannel.url = line;
      channels.push(currentChannel as Channel);
      currentChannel = null;
    }
  }
  
  return channels;
};

// Get default channel for home page player
export const getDefaultChannel = (): Channel => {
  return {
    id: 'asianet-news',
    name: 'Asianet News',
    logo: 'https://yt3.googleusercontent.com/ytc/AOPolaQbqRNI1-le9O11O3aYe1S4RCPxwQvE_FYfJg=s176-c-k-c0x00ffffff-no-rj',
    group: 'News',
    url: 'https://vidcdn.vidgyor.com/asianet-origin/liveabr/playlist.m3u8',
    country: 'India',
    language: 'Malayalam'
  };
};

// Channels to show on home page with reliable streams
const getIndianChannels = (): Channel[] => {
  return [
    {
      id: 'asianet-news',
      name: 'Asianet News',
      logo: 'https://yt3.googleusercontent.com/ytc/AOPolaQbqRNI1-le9O11O3aYe1S4RCPxwQvE_FYfJg=s176-c-k-c0x00ffffff-no-rj',
      group: 'News',
      url: 'https://vidcdn.vidgyor.com/asianet-origin/liveabr/playlist.m3u8',
      country: 'India',
      language: 'Malayalam'
    },
    {
      id: 'bbc-world',
      name: 'BBC World News',
      logo: 'https://static.wikia.nocookie.net/logopedia/images/f/ff/BBC_World_News_2019.svg',
      group: 'News',
      url: 'http://ott-cdn.ucom.am/s24/index.m3u8',
      country: 'United Kingdom',
      language: 'English'
    },
    {
      id: 'cnn-news',
      name: 'CNN',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1280px-CNN.svg.png',
      group: 'News',
      url: 'https://cnn-cnninternational-1-gb.samsung.wurl.com/manifest/playlist.m3u8',
      country: 'United States',
      language: 'English'
    },
    {
      id: 'red-bull-tv',
      name: 'Red Bull TV',
      logo: 'https://i.imgur.com/7NeBmWX.jpg',
      group: 'Sports',
      url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8',
      country: 'International',
      language: 'English'
    },
    {
      id: 'bloomberg-tv',
      name: 'Bloomberg TV',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Bloomberg_Television_2016.png',
      group: 'Business',
      url: 'https://bloomberg-bloomberg-1-eu.rakuten.wurl.tv/playlist.m3u8',
      country: 'United States',
      language: 'English'
    },
    {
      id: 'fashion-tv',
      name: 'Fashion TV',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Fashion_TV_logo.svg/1280px-Fashion_TV_logo.svg.png',
      group: 'Lifestyle',
      url: 'https://fashiontv-fashiontv-1-eu.rakuten.wurl.tv/playlist.m3u8',
      country: 'France',
      language: 'English'
    },
    {
      id: 'euronews',
      name: 'Euronews English',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Euronews_2016_logo.svg/1280px-Euronews_2016_logo.svg.png',
      group: 'News',
      url: 'https://d1mpprlbe8tn2j.cloudfront.net/v1/master/7b67fbda7ab859400a821e9aa0deda20ab7ca3d2/euronewsLive/87O7AhxRUdeeIVqf/ewnsabren_eng.m3u8',
      country: 'Europe',
      language: 'English'
    },
    {
      id: 'nasa-tv',
      name: 'NASA TV',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/NASA_TV.svg/1280px-NASA_TV.svg.png',
      group: 'Science',
      url: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
      country: 'United States',
      language: 'English'
    },
    {
      id: 'abc-news',
      name: 'ABC News',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABC_News_logo_2021.svg/1200px-ABC_News_logo_2021.svg.png',
      group: 'News',
      url: 'https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8',
      country: 'United States',
      language: 'English'
    },
    {
      id: 'sky-news',
      name: 'Sky News',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Sky_News_logo.svg/1280px-Sky_News_logo.svg.png',
      group: 'News',
      url: 'https://siloh.pluto.tv/lilo/production/SkyNews/master.m3u8',
      country: 'United Kingdom',
      language: 'English'
    },
    {
      id: 'france24',
      name: 'France 24 English',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/FRANCE_24_logo.svg/1280px-FRANCE_24_logo.svg.png',
      group: 'News',
      url: 'https://d2223ykdwbwv7j.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/France24_W-Europe/index.m3u8',
      country: 'France',
      language: 'English'
    }
  ];
};

export const fetchAndParsePlaylist = async (): Promise<Channel[]> => {
  try {
    // For home page, return only our 10 curated Indian channels
    return getIndianChannels();

    // If you want to revert to the previous behavior, uncomment the code below:
    /*
    const url = 'https://iptv-org.github.io/iptv/index.m3u';
    const parsedChannels = await parseM3U(url);
    return parsedChannels;
    */
  } catch (error) {
    console.error('Error fetching and parsing playlist:', error);
    // Return Indian channels if there's an error
    return getIndianChannels();
  }
};
