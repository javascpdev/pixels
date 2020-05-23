import React, { useEffect, useMemo, useState } from 'react';

import constants from '~/constants';
import flattenSnapshot from '~/utilities/flatten-snapshot';
import functions from '~/functions';
import localforage from '~/localforage';
import schema from '~/schema';
import useCurrentUser from '~/hooks/use-current-user';

const DEFAULT_USER_OAUTH2 = [];

DEFAULT_USER_OAUTH2.__isLoading = true;

export const UserOAuth2Context = React.createContext();

export default function UserOAuth2Provider({ children }) {
  const [oAuth2, setUserOAuth2] = useState(DEFAULT_USER_OAUTH2);
  const currentUser = useCurrentUser();
  const imgurRecord = useMemo(
    () => oAuth2.find((r) => r.__id == constants.OAUTH2.IMGUR.SERVICE_ID),
    [oAuth2]
  );
  const imgurCreated = useMemo(() => (imgurRecord ? imgurRecord.created : null), [imgurRecord]);
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

  useEffect(() => {
    if (currentUser && imgurCreated) {
      const isExpired = getIsExpired({
        createdMillis: imgurCreated,
        expiredMillis: constants.OAUTH2.IMGUR.EXPIRED_MILLIS,
      });

      if (isExpired) {
        (async () => {
          await functions.imgurRefreshOAuth2();
        })();
      }
    }
  }, [currentUser, imgurCreated]);

  return <UserOAuth2Context.Provider value={value}>{children}</UserOAuth2Context.Provider>;
}

function getIsExpired({ createdMillis, expiredMillis }) {
  const millisSinceCreation = new Date() - new Date(createdMillis);
  const isExpired = millisSinceCreation > expiredMillis;

  return isExpired;
}
