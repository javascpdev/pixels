import React, { useCallback, useEffect, useMemo, useState } from 'react';

import App from '~/app/app';
import BackButton from '~/top-bar/back-button';
import ImgurAlbumsProvider from '~/contexts/imgur-albums-context';
import ImgurImagesProvider from '~/contexts/imgur-images-context';
import ImgurUploadForm from '~/toolkit/imgur/imgur-upload-form';
import { LinearProgress } from '@rmwc/linear-progress';
import Title from '~/top-bar/title';
import UserOAuth2Provider from '~/contexts/user-oauth2-context';
import constants from '~/constants';
import effects from '~/effects';
import localforage from '~/localforage';
import styles from '~/css/upload.module.css';
import useImgurAlbums from '~/hooks/use-imgur-albums';
import useImgurImages from '~/hooks/use-imgur-images';
import useParams from '~/hooks/use-params';
import useRouter from '~/hooks/use-router';
import useUserOAuth2 from '~/hooks/use-user-oauth2';

export default function UploadPage() {
  const params = useParams();

  return (
    <App secure>
      <UserOAuth2Provider>
        <ImgurAlbumsProvider>
          <ImgurImagesProvider>
            <Upload {...params} />
          </ImgurImagesProvider>
        </ImgurAlbumsProvider>
      </UserOAuth2Provider>
    </App>
  );
}

function Upload({ url }) {
  const base64 = useBase64({ url });
  const decodedUrl = useMemo(() => url && atob(url), [url]);
  const { canUpload, isUploading, onUpload } = useUploading({ base64, url: decodedUrl });

  return (
    <>
      <BackButton href={constants.ROUTES.TOOLKIT.IMGUR.ROOT} />
      <Title />
      <div className={styles.wrapper}>
        {isUploading ? (
          <UploadingProgress />
        ) : (
          <ImgurUploadForm canUpload={canUpload} onUpload={onUpload} src={decodedUrl || base64} />
        )}
      </div>
    </>
  );
}

function UploadingProgress() {
  return (
    <>
      <h1>Uploading to Imgur...</h1>
      <br />
      <LinearProgress />
    </>
  );
}

function useBase64({ url }) {
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    (async () => {
      if (!url) {
        const base64 = await localforage.getBase64Upload();

        setBase64(base64);
      }
    })();
  }, [setBase64, url]);

  return base64;
}

function useUploading({ base64, url }) {
  const oAuth2 = useUserOAuth2({ serviceId: constants.OAUTH2.IMGUR.SERVICE_ID });
  const accessToken = oAuth2.accessToken;
  const { redirect } = useRouter();
  const { addAlbum } = useImgurAlbums();
  const { addImage } = useImgurImages();
  const [isUploading, setIsUploading] = useState(false);
  const onUpload = useCallback(
    async ({ albumId, albumTitle }) => {
      const payload = { albumHash: albumId, accessToken };

      if (url) {
        payload.url = url;
      } else {
        payload.base64 = base64.split(',').pop();
      }

      if (albumId) {
        payload.album = albumId;
      }

      setIsUploading(true);

      const response = await effects.imgurImageUpload(payload);
      const image = response?.data?.data;
      const error = response?.response?.data.data.error;

      if (error) {
        alert(error);
        setIsUploading(false);
      } else {
        await addImage(image);

        await localforage.setBase64Upload(undefined);

        if (!albumId) {
          const response = await effects.imgurCreateAlbum({
            accessToken,
            title: albumTitle,
            ids: [image.id],
          });
          const album = { ...response.data.data, cover: image.id, title: albumTitle };

          await addAlbum(album);
        }

        redirect(constants.ROUTES.TOOLKIT.IMGUR.ROOT);
      }
    },
    [base64, accessToken, addAlbum, addImage, redirect, setIsUploading, url]
  );

  return { canUpload: !!accessToken, isUploading, onUpload };
}
