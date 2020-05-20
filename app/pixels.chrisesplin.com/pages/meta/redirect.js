import React, { useEffect } from 'react';

import constants from '~/constants';
import localforage from '~/localforage';
import useLoginRedirect from '~/hooks/use-login-redirect';
import useRouter from '~/hooks/use-router';

export default function Redirect() {
  const router = useRouter();
  const { clearRedirectUrl } = useLoginRedirect();

  useEffect(() => {
    (async () => {
      const loginRedirectUrl = await localforage.getLoginRedirect();

      if (loginRedirectUrl) {
        await clearRedirectUrl();

        router.redirect(loginRedirectUrl);
      } else {
        router.redirect(constants.ROUTES.DASHBOARD);
      }
    })();
  }, [router]);

  return null;
}
