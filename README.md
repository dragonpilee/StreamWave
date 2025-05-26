# StreamWave.TV

![Next.js](https://img.shields.io/badge/Framework-Next.js-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![PWA](https://img.shields.io/badge/PWA-Supported-green)
![video.js](https://img.shields.io/badge/Player-video.js-orange)
![IPTV-org](https://img.shields.io/badge/Data-IPTV--org-01b4e4)

> **Developed by Alan Cyril Sunny**  
> If you find this project helpful, please consider ⭐ [starring the repository](https://github.com/dragonpilee/StreamWave)!

---

![StreamWave.TV Logo](/public/logo192.svg)

StreamWave.TV is a Progressive Web App (PWA) for streaming international IPTV channels, built with cutting-edge web technologies to provide a seamless media consumption experience.

---

## 🌟 Features

- **Live TV Streaming**: Watch live TV channels from around the world
- **International Channels**: Access 10 curated Indian channels including news, entertainment, music, and sports
- **Search & Filter**: Find channels by name, country, language, or category
- **Responsive Design**: Optimized viewing experience on mobile, tablet, and desktop
- **PWA Support**: Install as a standalone app on any device
- **Offline Mode**: Basic functionality works even when offline
- **Video Player**: Full-featured video playback with video.js integration

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **UI Design**: Custom styling with CSS and inline styles
- **Frontend**: React with hooks for state management
- **Video Playback**: [video.js](https://videojs.com/) for HLS stream support
- **PWA Features**: Service worker, web manifest, and offline support
- **IPTV Source**: Integration with [IPTV-org](https://github.com/iptv-org/iptv) repository

---

## 📋 Project Structure

```
├── public/               # Static assets & PWA files
│   ├── logo192.svg       # Application logo
│   ├── manifest.json     # PWA manifest
│   └── sw.js             # Service worker
├── src/
│   ├── components/       # React components
│   │   ├── ChannelCard   # Individual channel display
│   │   ├── ChannelList   # Grid view of channels
│   │   ├── FilterPanel   # Channel filtering UI
│   │   ├── Layout        # App layout structure
│   │   ├── Navbar        # Navigation header
│   │   ├── SearchBar     # Channel search functionality
│   │   └── VideoPlayer   # video.js implementation
│   ├── pages/            # Next.js pages
│   │   ├── channel/[id]  # Individual channel view
│   │   ├── _app          # Application wrapper
│   │   └── index         # Home page
│   ├── styles/           # Global CSS
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions
│       ├── filterHelpers # Channel filtering logic
│       └── m3uParser     # M3U playlist parsing
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dragonpilee/StreamWave.git
   cd streamwave-tv
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📱 PWA Installation

StreamWave.TV can be installed as a Progressive Web App on:

- **Desktop**: Click the install icon in the address bar in Chrome, Edge, or other compatible browsers
- **Android**: Tap "Add to Home Screen" from the browser menu
- **iOS**: Tap the share button, then "Add to Home Screen"

---

## 🔍 Channel Playback

The application uses HLS (HTTP Live Streaming) to play video content. If you encounter playback issues:

- Ensure your internet connection is stable
- Some channels may be region-restricted or temporarily unavailable
- Try different channels as stream availability may vary

---

## 🧩 Component Details

### Channel Filter System

Channels can be filtered by:
- Country: Filter channels by country of origin
- Language: Show channels in specific languages
- Category: Filter by genre (News, Entertainment, Sports, etc.)

### Search Functionality

- **Real-time search**: Results update as you type
- **Combined filtering**: Use search and filters together for precise results

### Video Player Features

- Play/Pause controls
- Volume adjustment
- Fullscreen mode
- Responsive sizing

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgements

- [IPTV-org](https://github.com/iptv-org/iptv) for channel data
- [video.js](https://videojs.com/) for the video player
- [Next.js](https://nextjs.org/) for the application framework
- All open-source libraries used in this project

---
