import { RootContext } from '+/contexts/root-context';
import { useContext } from 'react';

export default function useWorkspace() {
  return useContext(RootContext).workspace;
}
