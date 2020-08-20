import { useEffect } from 'react';

export default function useClickOff({ isActive = true, ref, callback }, memoArray = []) {
  useEffect(() => {
    if (isActive) {
      function handler(e) {
        const isContained = ref.current.contains(e.target);

        !isContained && callback();
      }

      window.addEventListener('click', handler);

      return () => window.removeEventListener('click', handler);
    }
  }, memoArray);

  return null;
}
