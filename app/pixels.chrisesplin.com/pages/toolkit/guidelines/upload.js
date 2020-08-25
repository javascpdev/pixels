import React, { useCallback, useEffect, useMemo, useState } from 'react';

import App from '~/app/app';
import BackButton from '~/top-bar/back-button';
import FilesUploadForm from '~/toolkit/files/files-upload-form';
import { LinearProgress } from '@rmwc/linear-progress';
import Title from '~/top-bar/title';
import constants from '../../../components/toolkit/guidelines/node_modules/~/constants';
import localforage from '~/localforage';
import styles from '~/css/upload.module.css';
import useParams from '~/hooks/use-params';
import useRouter from '~/hooks/use-router';
import useUpload from '~/hooks/use-upload';

export default function UploadPage() {
  const params = useParams();

  return (
    <App secure>
      <Upload {...params} />
    </App>
  );
}

function Upload({ url }) {
  const { base64, file } = useUploadingFile({ url });
  const decodedUrl = useMemo(() => url && atob(url), [url]);
  const { isUploading, onUpload } = useUploading({ base64, url: decodedUrl });

  return (
    <>
      <BackButton href={constants.ROUTES.TOOLKIT.FILES.ROOT} />
      <Title />
      <div className={styles.wrapper}>
        {isUploading ? (
          <UploadingProgress />
        ) : (
          <FilesUploadForm file={file} onUpload={onUpload} src={decodedUrl || base64} />
        )}
      </div>
    </>
  );
}

function UploadingProgress() {
  return (
    <>
      <h1>Uploading...</h1>
      <br />
      <LinearProgress />
    </>
  );
}

function useUploadingFile({ url }) {
  const [base64, setBase64] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    (async () => {
      if (!url) {
        const base64 = await localforage.getBase64Upload();
        const file = await localforage.getFileUpload();

        setBase64(base64);
        setFile(file);
      }
    })();
  }, [setBase64, setFile, url]);

  return useMemo(() => ({ base64, file }), [base64, file]);
}

function useUploading({ base64, url }) {
  const { redirect } = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const upload = useUpload();
  const onUpload = useCallback(
    async ({ tags }) => {
      setIsUploading(true);

      const { error, record } = await upload({ base64, url, tags });

      if (error) {
        alert(error);
        setIsUploading(false);
      } else {
        await localforage.setBase64Upload(undefined);

        redirect(constants.ROUTES.TOOLKIT.FILES.ROOT);
      }
    },
    [base64, redirect, setIsUploading, url, upload]
  );

  return { isUploading, onUpload };
}
