import React from 'react';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      <footer className="bg-gray-800 text-gray-400" style={{ padding: '1.5rem 0', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <p>StreamWave.TV &copy; {new Date().getFullYear()}</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Channel data provided by the <a href="https://github.com/iptv-org/iptv" className="text-blue-400" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">IPTV-org</a> repository.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
