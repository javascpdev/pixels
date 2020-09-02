import { RootContext } from '_content/components/contexts/root-context';
import { useContext } from 'react';

export default function useTab() {
  return useContext(RootContext).tab;
}
