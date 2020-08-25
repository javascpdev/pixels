import React, { useCallback, useState } from 'react';

import { Button } from '@rmwc/button';
import Modal from './modal';
import ProgressButton from '~/ui/progress-button';
import ReactDOM from 'react-dom';
import localforage from '~/localforage';
import modalStyles from './modal.module.css';
import styles from './uploader-modal.module.css';
import useRouter from '~/hooks/use-router';

export default function UploaderModalPortal({ isOpen, ...props }) {
  return isOpen
    ? ReactDOM.createPortal(<UploaderModal {...props} />, window.document.getElementById('modal'))
    : null;
}

function UploaderModal({ base64, file, onClose, redirectUrl }) {
  const { redirect } = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const upload = useCallback(async () => {
    await localforage.setBase64Upload(base64);
    await localforage.setFileUpload(file);

    setIsUploading(false);
    redirect(redirectUrl);
  }, [base64, file, onClose, redirect, redirectUrl, setIsUploading]);

  return (
    <Modal onClose={onClose}>
      <>
        <img className={styles.preview} src={base64} alt="image to upload" />
        <div className={modalStyles.buttons}>
          <Button onClick={onClose}>Cancel</Button>
          <ProgressButton raised isWaiting={isUploading} onClick={upload}>
            Upload
          </ProgressButton>
        </div>
      </>
    </Modal>
  );
}
