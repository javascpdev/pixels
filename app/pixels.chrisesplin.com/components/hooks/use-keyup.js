import { useEffect } from 'react';

export default function useKeyup(handler) {
  useEffect(() => {
    window.addEventListener('keyup', handler);

    return () => window.removeEventListener('keyup', handler);
  }, []);

  return null;
}
