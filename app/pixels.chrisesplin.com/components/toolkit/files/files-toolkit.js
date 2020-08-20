import { CloudUploadSvg, CreateNewFolderSvg, FolderSvg, SearchSvg } from '~/svg';
import React, { useCallback, useState } from 'react';

import BulkUploader from '~/ui/bulk-uploader';
import FileSearch from './file-search';
import FilesImages from './files-images';
import { IconButton } from '@rmwc/icon-button';
import ReactDOM from 'react-dom';
import Toolkit from '../toolkit';
import Uploader from '~/ui/uploader';
import UserUploadsProvider from '~/contexts/user-uploads-context';
import constants from '~/constants';
import styles from '../image-toolkits.module.css';
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
  const [query, setQuery] = useState();
  const [isSearching, setIsSearching] = useState(false);

  if (userUploads.__isLoading) {
    return null;
  } else {
    return (
      <div className={styles.wrapper}>
        <FilesToolkitMenu
          hasUploads={userUploads.length}
          onIsOpen={setIsSearching}
          onQuery={setQuery}
        />
        <FilesImages isSearching={isSearching} query={query} uploads={userUploads} />
      </div>
    );
  }
}

function FilesToolkitMenu({ hasUploads, onIsOpen, onQuery }) {
  const el = window.document.getElementById('toolkit-menu');

  return el
    ? ReactDOM.createPortal(
        <>
          {hasUploads ? (
            <FileSearch onIsOpen={onIsOpen} onQuery={onQuery}>
              <IconButton icon={<SearchSvg />} />
            </FileSearch>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>👉</div>
          )}
          <Uploader redirectUrl={constants.ROUTES.TOOLKIT.FILES.UPLOAD}>
            <IconButton icon={<CloudUploadSvg />} />
          </Uploader>
          <BulkUploader>
            <IconButton icon={<CreateNewFolderSvg />} />
          </BulkUploader>
        </>,
        el
      )
    : null;
}
