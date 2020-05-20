import { useCallback, useEffect, useState } from 'react';

import localforage from '~/localforage';

export default function useLoginRedirect() {
  const [loginRedirect, setLoginRedirect] = useState('');
  const setRedirectUrl = useCallback(async (url) => localforage.setLoginRedirect(url));
  const clearRedirectUrl = useCallback(async () => localforage.setLoginRedirect(null));

  useEffect(() => {
    (async () => {
      const loginRedirect = await localforage.getLoginRedirect();

      setLoginRedirect(loginRedirect);
    })();
  }, [setLoginRedirect]);

  return { clearRedirectUrl, loginRedirect, setRedirectUrl };
}
