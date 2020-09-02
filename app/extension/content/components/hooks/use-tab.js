import { RootContext } from '+/contexts/root-context';
import { useContext } from 'react';

export default function useTab() {
  return useContext(RootContext).tab;
}
