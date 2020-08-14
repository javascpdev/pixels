import React, { useEffect, useMemo, useState } from 'react';

import flattenSnapshot from '~/utilities/flatten-snapshot';
import localforage from '~/localforage';
import schema from '~/schema';
import useCurrentUser from '~/hooks/use-current-user';

const DEFAULT_USER_UPLOADS = [];

DEFAULT_USER_UPLOADS.__isLoading = true;

export const UserUploadsContext = React.createContext();

export default function UserUploadsProvider({ children }) {
  const [uploads, setUserUploads] = useState(DEFAULT_USER_UPLOADS);
  const currentUser = useCurrentUser();
  const value = uploads;

  useEffect(() => {
    let cancelled = false;
    let disconnect = () => {};

    if (currentUser) {
      const uploadsRef = schema.getUserUploadsRef(currentUser.uid);

      disconnect = uploadsRef.onSnapshot((snapshot) => {
        if (!cancelled) {
          const uploads = flattenSnapshot(snapshot);

          setUserUploads(uploads);
          localforage.setUserUploads(uploads);
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
      const uploads = await localforage.getUserUploads();

      uploads && setUserUploads(uploads);
    })();
  }, []);

  return <UserUploadsContext.Provider value={value}>{children}</UserUploadsContext.Provider>;
}
