import { useEffect } from 'react';

export default function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  }, []);
}
