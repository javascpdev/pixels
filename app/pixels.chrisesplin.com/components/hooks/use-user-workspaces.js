import { UserWorkspacesContext } from '~/contexts/user-workspaces-context';
import { useContext } from 'react';

export default function useUserWorkspaces() {
  return useContext(UserWorkspacesContext);
}
