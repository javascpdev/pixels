import { RootContext } from '~/contexts/root-context';
import { useContext } from 'react';

export default function useCurrentUser() {
  const { currentUser } = useContext(RootContext);

  return currentUser;
}
