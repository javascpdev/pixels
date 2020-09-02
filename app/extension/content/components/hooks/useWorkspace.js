import { RootContext } from '_content/components/contexts/root-context';
import { useContext } from 'react';

export default function useWorkspace() {
  return useContext(RootContext).workspace;
}
