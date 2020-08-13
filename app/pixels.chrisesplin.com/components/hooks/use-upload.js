import effects from '~/effects';
import { useCallback } from 'react';
import useCurrentUser from '~/hooks/use-current-user';

export default function useUpload() {
  const currentUser = useCurrentUser();

  return useCallback(
    ({ base64, url, tags }) => effects.upload({ base64, tags, uid: currentUser.uid, url }),
    [currentUser]
  );
}
