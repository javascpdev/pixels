import { CloudUploadSvg, FolderSvg, SearchSvg } from '~/svg';

import { IconButton } from '@rmwc/icon-button';
import React from 'react';
import ReactDOM from 'react-dom';
import Toolkit from '../toolkit';
import Uploader from '~/ui/uploader';
import constants from '~/constants';

export default function ImgurToolkitConnected() {
  return (
    <Toolkit
      icon={<FolderSvg width="2.5em" height="2.5em" fill={constants.COLORS.MDC_THEME_SECONDARY} />}
      title="Files"
    >
      <FilesToolkitWrapper />
    </Toolkit>
  );
}

function FilesToolkitWrapper() {
  const isLoading = typeof window == 'undefined';

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <FilesToolkitMenu />
        <h3>Images</h3>
      </>
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
