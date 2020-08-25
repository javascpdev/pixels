import { WorkspaceContext } from '~/contexts/user-workspaces-context';
import { useContext } from 'react';

export default function useWorkspace() {
  return useContext(WorkspaceContext);
}
