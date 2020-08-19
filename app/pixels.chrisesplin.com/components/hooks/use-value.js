import { useMemo } from 'react';

export default function useValue(map) {
  return useMemo(() => map, Object.values(map));
}
