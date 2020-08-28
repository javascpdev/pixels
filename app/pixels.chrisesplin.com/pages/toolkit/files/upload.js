import App from '~/app/app';
import FileUpload from '~/toolkit/files/file-upload';
import React from 'react';
import useParams from '~/hooks/use-params';

export default function UploadPage() {
  const params = useParams();

  return (
    <App secure>
      <FileUpload {...params} />
    </App>
  );
}
