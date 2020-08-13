import { CloudUploadSvg, PowerOffSvg, RefreshSvg, SearchSvg } from '~/svg';
import React, { useCallback, useMemo } from 'react';

import { IconButton } from '@rmwc/icon-button';
import ImgurAlbums from './imgur-albums';
import ImgurAlbumsProvider from '~/contexts/imgur-albums-context';
import ImgurConnectPrompt from './imgur-connect-prompt';
import ImgurImages from './imgur-images';
import ImgurImagesProvider from '~/contexts/imgur-images-context';
import ReactDOM from 'react-dom';
import Toolkit from '../toolkit';
import Uploader from '~/ui/uploader';
import UserOAuth2Provider from '~/contexts/user-oauth2-context';
import classnames from 'classnames';
import constants from '~/constants';
import effects from '~/effects';
import styles from './imgur-toolkit.module.css';
import useCurrentUser from '~/hooks/use-current-user';
import useImgurAlbums from '~/hooks/use-imgur-albums';
import useImgurImages from '~/hooks/use-imgur-images';
import useUserOAuth2 from '~/hooks/use-user-oauth2';

export default function ImgurToolkitConnected() {
  return (
    <Toolkit src="/images/imgur/imgur-favicon-152.png" title="Imgur">
      <UserOAuth2Provider>
        <ImgurAlbumsProvider>
          <ImgurImagesProvider>
            <ImgurToolkitWrapper />
          </ImgurImagesProvider>
        </ImgurAlbumsProvider>
      </UserOAuth2Provider>
    </Toolkit>
  );
}

function ImgurToolkitWrapper() {
  const oauth2 = useUserOAuth2({ serviceId: constants.OAUTH2.IMGUR.SERVICE_ID });
  const isLoading = useMemo(() => oauth2 && oauth2.__isLoading, [oauth2]);

  if (isLoading) {
    return null;
  } else if (!oauth2) {
    return <ImgurConnectPrompt />;
  } else {
    return <ImgurToolkit />;
  }
}

function ImgurToolkit() {
  const currentUser = useCurrentUser();
  const deleteOAuth2 = useCallback(
    () =>
      effects.deleteOAuth2({ serviceId: constants.OAUTH2.IMGUR.SERVICE_ID, uid: currentUser.uid }),
    [currentUser]
  );
  const { albums, isLoading: isRefreshingAlbums, refresh: refreshAlbums } = useImgurAlbums();
  const { images, isLoading: isRefreshingImages, refresh: refreshImages } = useImgurImages();
  const refresh = useCallback(async () => Promise.all([refreshAlbums(), refreshImages()]), [
    refreshAlbums,
    refreshImages,
  ]);
  const refreshClassName = useMemo(
    () => classnames({ spinning: isRefreshingAlbums || isRefreshingImages }),
    [isRefreshingAlbums, isRefreshingImages]
  );

  return (
    <div className={styles.wrapper}>
      <ImgurToolkitMenu
        refresh={refresh}
        deleteOAuth2={deleteOAuth2}
        refreshClassName={refreshClassName}
      />

      {albums.length && (
        <>
          <h3>Albums</h3>
          <ImgurAlbums albums={albums} />
        </>
      )}
      {images.length && (
        <>
          <h3>Images</h3>
          <ImgurImages images={images} />
        </>
      )}
    </div>
  );
}

function ImgurToolkitMenu({ refresh, refreshClassName, deleteOAuth2 }) {
  const oauth2 = useUserOAuth2({ serviceId: constants.OAUTH2.IMGUR.SERVICE_ID });

  return ReactDOM.createPortal(
    <>
      <a
        href={`https://imgur.com/user/${oauth2?.accountUsername}/posts`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <IconButton icon={<SearchSvg />} />
      </a>
      <Uploader redirectUrl={constants.ROUTES.TOOLKIT.IMGUR.UPLOAD}>
        <IconButton icon={<CloudUploadSvg />} />
      </Uploader>
      <IconButton icon={<PowerOffSvg />} onClick={deleteOAuth2} />
      <IconButton icon={<RefreshSvg className={refreshClassName} />} onClick={refresh} />
    </>,
    window.document.getElementById('toolkit-menu')
  );
}
