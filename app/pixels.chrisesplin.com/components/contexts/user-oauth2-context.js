import React, { useEffect, useMemo, useState } from 'react';

import flattenSnapshot from '~/utilities/flatten-snapshot';
import localforage from '~/localforage';
import schema from '~/schema';
import useCurrentUser from '~/hooks/use-current-user';

const DEFAULT_USER_OAUTH2 = [];

DEFAULT_USER_OAUTH2.__isLoading = true;

export const UserOAuth2Context = React.createContext();

export default function UserOAuth2Provider({ children }) {
  const [oAuth2, setUserOAuth2] = useState(DEFAULT_USER_OAUTH2);
  const currentUser = useCurrentUser();
  const value = useMemo(() => oAuth2, [oAuth2]);

  useEffect(() => {
    let cancelled = false;
    let disconnect = () => {};

    if (currentUser) {
      const oAuth2Ref = schema.getUserOAuth2Ref(currentUser.uid);

      disconnect = oAuth2Ref.onSnapshot((snapshot) => {
        if (!cancelled) {
          const oAuth2 = flattenSnapshot(snapshot);

          setUserOAuth2(oAuth2);
          localforage.setUserOAuth2(oAuth2);
        }
      });
    }

    return () => {
      cancelled = true;

      disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      const oAuth2 = await localforage.getUserOAuth2();

      oAuth2 && setUserOAuth2(oAuth2);
    })();
  }, []);

  return <UserOAuth2Context.Provider value={value}>{children}</UserOAuth2Context.Provider>;
}
