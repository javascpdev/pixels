import React, { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import constants from '~/constants';
import localforage from '~/localforage';
import useUserOAuth2 from '~/hooks/use-user-oauth2';

const DEFAULT_IMAGES = { __isLoading: true, __localforageFetching: true, __lastFetched: 0 };
const DEFAULT_IMAGES_LOCALFORAGE_FETCHED = { ...DEFAULT_IMAGES, __localforageFetching: false };
const CACHE_MILLIS = 1000 * 60 * 60;

export const ImgurImagesContext = React.createContext();

export default function ImgurImagesProvider({ children }) {
  const oAuthRecord = useUserOAuth2({ serviceId: constants.OAUTH2.IMGUR.SERVICE_ID });
  const [images, setLocalImages] = useState(DEFAULT_IMAGES);
  const [isLoading, setIsLoading] = useState(false);
  const setImages = useCallback(
    async (images) => {
      setLocalImages(images);

      await localforage.setImgurImages(images);
    },
    [setLocalImages]
  );
  const refresh = useCallback(() => setImages(DEFAULT_IMAGES_LOCALFORAGE_FETCHED), []);
  const addImage = useCallback(async (image) => setImages([image, ...images]), [images, setImages]);
  const value = useMemo(() => ({ addImage, images, isLoading, refresh }), [
    addImage,
    images,
    isLoading,
    refresh,
  ]);

  useEffect(() => {
    const hasOAuth = oAuthRecord && oAuthRecord.accountUsername;
    const localForageFetched = !images.__localforageFetching;
    const lastFetchedExpired = Date.now() - images.__lastFetched > CACHE_MILLIS;
    const shouldQuery = hasOAuth && localForageFetched && lastFetchedExpired;

    if (shouldQuery) {
      let cancelled = false;

      setIsLoading(true);

      (async () => {
        const images = await getImages(oAuthRecord);

        await localforage.setImgurImages(images);

        !cancelled && setImages(images);

        setIsLoading(false);
      })();

      return () => (cancelled = true);
    }
  }, [images, oAuthRecord, setIsLoading]);

  useEffect(() => {
    (async () => {
      const images = await localforage.getImgurImages();

      if (images) {
        setImages(images);
      } else {
        setImages(DEFAULT_IMAGES_LOCALFORAGE_FETCHED);
      }
    })();
  }, []);

  return <ImgurImagesContext.Provider value={value}>{children}</ImgurImagesContext.Provider>;
}

async function getImages(oAuthRecord) {
  let page = 0;
  let images = [];

  while (true) {
    const imagesByPage = await getImagesPage({ oAuthRecord, page });

    if (!imagesByPage.length) {
      break;
    } else {
      images = images.concat(imagesByPage);
      page++;
    }
  }

  images.__lastFetched = Date.now();

  return images;
}

async function getImagesPage({ oAuthRecord, page }) {
  const { accessToken, accountUsername } = oAuthRecord;
  const url = constants.ROUTES.TOOLKIT.IMGUR.IMAGES({ username: accountUsername, page });

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const images = response.data.data;

  return images;
}
