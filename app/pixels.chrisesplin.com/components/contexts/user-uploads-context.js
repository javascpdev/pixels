import React, { useCallback, useEffect, useMemo, useState } from 'react';

import flattenSnapshot from '~/utilities/flatten-snapshot';
import localforage from '~/localforage';
import schema from '~/schema';
import useCurrentUser from '~/hooks/use-current-user';
import useValue from '~/hooks/use-value';

const DEFAULT_USER_UPLOADS = Object.assign([], { __isLoading: true });

export const UserUploadsContext = React.createContext();

export default function UserUploadsProvider({ children, pageSize = 20 }) {
  const [deleting, setDeleting] = useState(new Set());
  const [isDone, setIsDone] = useState(false);
  const [uploads, setUserUploads] = useState(DEFAULT_USER_UPLOADS);
  const currentUser = useCurrentUser();
  const uploadsRef = useMemo(() => currentUser && schema.getUserUploadsRef(currentUser.uid), [
    currentUser,
  ]);
  const nextPage = useCallback(async () => {
    if (uploadsRef) {
      const [cursor] = uploads.slice(-1);
      const query = uploadsRef
        .orderBy('created', 'desc')
        .startAfter(cursor.created)
        .limit(pageSize);
      const snapshot = await query.get();

      return handleNewPage({ pageSize, setIsDone, setUserUploads, snapshot, uploads });
    }
  }, [setIsDone, uploads, uploadsRef]);
  const reset = useCallback(() => setIsDone(false), [setIsDone]);
  const deleteUploads = useCallback(
    async (ids) => {
      const idsSet = new Set(ids);
      const newUploads = uploads.filter((u) => !idsSet.has(u.__id));

      setDeleting((deleting) => new Set([...deleting, ...ids]));

      setUserUploads(newUploads);

      await localforage.setUserUploads(newUploads);
    },
    [setUserUploads, uploads],
  );
  const filteredUploads = useMemo(
    () => (!uploads.length ? uploads : uploads.filter((u) => !deleting.has(u.__id))),
    [deleting, uploads],
  );
  const value = useValue({ deleteUploads, isDone, reset, nextPage, uploads: filteredUploads });

  useEffect(() => {
    let cancelled = false;
    let disconnect = () => {};

    if (uploadsRef) {
      const query = uploadsRef.orderBy('created', 'desc').limit(1);

      disconnect = query.onSnapshot(
        (snapshot) => !cancelled && handleNewSnapshot({ setUserUploads, snapshot, uploads }),
      );
    }

    return () => {
      cancelled = true;

      disconnect();
    };
  }, [uploadsRef]);

  useEffect(() => {
    (async () => {
      const uploads = await localforage.getUserUploads();

      uploads && setUserUploads(uploads);
    })();
  }, []);

  return <UserUploadsContext.Provider value={value}>{children}</UserUploadsContext.Provider>;
}

async function handleNewSnapshot({ setUserUploads, snapshot, uploads }) {
  const [uploadToAdd] = flattenSnapshot(snapshot);

  if (uploadToAdd) {
    let newUploads;

    setUserUploads((uploads) => {
      const existingIds = new Set(uploads.map((u) => u.__id));
      const exists = existingIds.has(uploadToAdd?.__id);
      const newUploads = uploads.splice(0);

      if (!exists) {
        newUploads.unshift(uploadToAdd);
      }

      return newUploads;
    });

    await localforage.setUserUploads(newUploads);
  } else {
    setUserUploads((uploads) => [...uploads]);
  }
}

async function handleNewPage({ pageSize, setIsDone, setUserUploads, snapshot, uploads }) {
  const uploadsToAdd = flattenSnapshot(snapshot);
  const existingIds = new Set(uploads.map((u) => u.__id));
  const filteredUploadsToAdd = uploadsToAdd.filter((u) => !existingIds.has(u.__id));
  const newUploads = uploads.concat(filteredUploadsToAdd);
  const isDone = uploadsToAdd.length < pageSize;

  setIsDone(isDone);
  setUserUploads(newUploads);

  await localforage.setUserUploads(newUploads);
}
