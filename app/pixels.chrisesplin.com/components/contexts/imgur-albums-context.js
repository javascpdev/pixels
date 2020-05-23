import React, { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import constants from '~/constants';
import localforage from '~/localforage';
import useUserOAuth2 from '~/hooks/use-user-oauth2';

const DEFAULT_ALBUMS = { __isLoading: true, __localforageFetching: true, __lastFetched: 0 };
const DEFAULT_ALBUMS_LOCALFORAGE_FETCHED = { ...DEFAULT_ALBUMS, __localforageFetching: false };
const CACHE_MILLIS = 1000 * 60 * 60;

export const ImgurAlbumsContext = React.createContext();

export default function ImgurAlbumsProvider({ children }) {
  const oAuthRecord = useUserOAuth2({ serviceId: constants.OAUTH2.IMGUR.SERVICE_ID });
  const [albums, setAlbums] = useState(DEFAULT_ALBUMS);
  const [isLoading, setIsLoading] = useState(false);
  const refresh = useCallback(() => setAlbums(DEFAULT_ALBUMS_LOCALFORAGE_FETCHED), []);
  const value = useMemo(() => ({ albums, isLoading, refresh }), [albums, isLoading, refresh]);

  useEffect(() => {
    const hasOAuth = oAuthRecord && oAuthRecord.accountUsername;
    const localForageFetched = !albums.__localforageFetching;
    const lastFetchedExpired = Date.now() - albums.__lastFetched > CACHE_MILLIS;
    const shouldQuery = hasOAuth && localForageFetched && lastFetchedExpired;

    if (shouldQuery) {
      let cancelled = false;

      setIsLoading(true);

      (async () => {
        const albums = await getAlbums(oAuthRecord);

        await localforage.setImgurAlbums(albums);

        !cancelled && setAlbums(albums);

        setIsLoading(false);
      })();

      return () => (cancelled = true);
    }
  }, [albums, oAuthRecord, setIsLoading]);

  useEffect(() => {
    (async () => {
      const albums = await localforage.getImgurAlbums();

      if (albums) {
        setAlbums(albums);
      } else {
        setAlbums(DEFAULT_ALBUMS_LOCALFORAGE_FETCHED);
      }
    })();
  }, []);

  return <ImgurAlbumsContext.Provider value={value}>{children}</ImgurAlbumsContext.Provider>;
}

async function getAlbums(oAuthRecord) {
  let page = 0;
  let albums = [];

  while (true) {
    const albumsByPage = await getAlbumsPage({ oAuthRecord, page });

    if (!albumsByPage.length) {
      break;
    } else {
      albums = albums.concat(albumsByPage);
      page++;
    }
  }

  albums.__lastFetched = Date.now();

  return albums;
}

async function getAlbumsPage({ oAuthRecord, page }) {
  const { accessToken, accountUsername } = oAuthRecord;
  const url = constants.ROUTES.TOOLKIT.IMGUR.ALBUMS({ username: accountUsername, page });

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const albums = response.data.data;

  return albums;
}
