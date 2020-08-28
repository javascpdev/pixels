import App from '~/app/app';
import ImgurUpload from '~/toolkit/imgur/imgur-upload';
import React from 'react';
import useParams from '~/hooks/use-params';

export default function UploadPage() {
  const params = useParams();

  return (
    <App secure>
      <ImgurUpload {...params} />
    </App>
  );
}
