import App from '~/app/app';
import FilesToolkit from '~/toolkit/files/files-toolkit';
import React from 'react';

export default function Files() {
  return (
    <App secure>
      <FilesToolkit />
    </App>
  );
}
