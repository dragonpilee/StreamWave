import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isInstallPromptShown, setIsInstallPromptShown] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setIsInstallPromptShown(true);
    });

    // Listen for the appinstalled event
    window.addEventListener('appinstalled', () => {
      // Hide the install button
      setIsInstallPromptShown(false);
      console.log('PWA was installed');
    });
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the saved prompt since it can't be used again
      setDeferredPrompt(null);
      setIsInstallPromptShown(false);
    });
  };

  return (
    <nav className="bg-gray-800" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
          <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            StreamWave.TV
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              href="/" 
              style={{ 
                color: 'rgb(209, 213, 219)', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                textDecoration: 'none',
                backgroundColor: router.pathname === '/' ? 'rgb(55, 65, 81)' : 'transparent' 
              }}
            >
              Home
            </Link>
            
            {isInstallPromptShown && (
              <button
                onClick={handleInstallClick}
                style={{ 
                  marginLeft: '1rem', 
                  backgroundColor: 'rgb(37, 99, 235)', 
                  color: 'white', 
                  padding: '0.5rem 0.75rem', 
                  borderRadius: '0.375rem', 
                  display: 'flex', 
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Install App
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
