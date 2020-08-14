import { CloudUploadSvg, FolderSvg, SearchSvg } from '~/svg';

import FilesImages from './files-images';
import { IconButton } from '@rmwc/icon-button';
import React from 'react';
import ReactDOM from 'react-dom';
import Toolkit from '../toolkit';
import Uploader from '~/ui/uploader';
import UserUploadsProvider from '~/contexts/user-uploads-context';
import constants from '~/constants';
import styles from './files-toolkit.module.css';
import useUserUploads from '~/hooks/use-user-uploads';

export default function ImgurToolkitConnected() {
  return (
    <Toolkit
      icon={<FolderSvg width="2.5em" height="2.5em" fill={constants.COLORS.MDC_THEME_SECONDARY} />}
      title="Files"
    >
      <UserUploadsProvider>
        <FilesToolkitWrapper />
      </UserUploadsProvider>
    </Toolkit>
  );
}

function FilesToolkitWrapper() {
  const userUploads = useUserUploads();

  if (userUploads.__isLoading) {
    return null;
  } else {
    return (
      <div className={styles.wrapper}>
        <FilesToolkitMenu />
        <FilesImages uploads={userUploads} />
      </div>
    );
  }
}

function FilesToolkitMenu({}) {
  const el = window.document.getElementById('toolkit-menu');

  return el
    ? ReactDOM.createPortal(
        <>
          <IconButton icon={<SearchSvg />} />
          <Uploader redirectUrl={constants.ROUTES.TOOLKIT.FILES.UPLOAD}>
            <IconButton icon={<CloudUploadSvg />} />
          </Uploader>
        </>,
        el
      )
    : null;
}
