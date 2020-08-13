import { enableMapSet } from 'immer';
import { useEffect } from 'react';

export default function useImmer() {
  useEffect(() => enableMapSet(), []);
}
