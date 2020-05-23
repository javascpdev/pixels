import { useContext, useMemo } from 'react';

import { UserOAuth2Context } from '~/contexts/user-oauth2-context';

export default function useUserOAuth2({ serviceId } = {}) {
  const oAuth2Records = useContext(UserOAuth2Context);

  return useMemo(() => {
    let result = oAuth2Records;

    if (!oAuth2Records.__isLoading && serviceId) {
      result = oAuth2Records.find((r) => r.__id == serviceId);
    }

    return result;
  }, [oAuth2Records, serviceId]);
}
