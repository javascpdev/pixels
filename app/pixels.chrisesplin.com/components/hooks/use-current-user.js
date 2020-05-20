import { currentUserAtom } from '~/state/atoms';
import { useRecoilValue } from 'recoil';

export default function useCurrentUser() {
  const currentUser = useRecoilValue(currentUserAtom);

  return currentUser;
}
