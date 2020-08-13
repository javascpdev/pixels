import { useEffect } from 'react';

export default function useKeyup(handler, memoArray = []) {
  useEffect(() => {
    window.addEventListener('keyup', handler);

    return () => window.removeEventListener('keyup', handler);
  }, memoArray);

  return null;
}
