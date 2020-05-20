import App from '~/app/app';
import ImgurToolkit from '~/toolkit/imgur-toolkit';
import React from 'react';

export default function Imgur() {
  return (
    <App secure>
      <ImgurToolkit />
    </App>
  );
}
