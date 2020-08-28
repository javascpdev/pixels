import React, { useCallback, useState } from 'react';

import { Button } from '@rmwc/button';
import { LinearProgress } from '@rmwc/linear-progress';
import Modal from './modal';
import ProgressButton from '~/ui/progress-button';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import effects from '~/effects';
import { extractFilesBase64 } from '~/ui/uploader';
import getFilenameTags from '~/utilities/get-filename-tags';
import getMegabytes from '~/utilities/get-megabytes';
import modalStyles from './modal.module.css';
import styles from './bulk-upload-modal.module.css';
import uploaderStyles from './uploader-modal.module.css';
import useCurrentUser from '~/hooks/use-current-user';

export default function BulkUploadModalPortal({ isOpen, ...props }) {
  return isOpen
    ? ReactDOM.createPortal(<BulkUploadModal {...props} />, window.document.getElementById('modal'))
    : null;
}

function BulkUploadModal({ files, onClose }) {
  const currentUser = useCurrentUser();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const onUpload = useCallback(async () => {
    setIsUploading(true);

    const filesBase64 = await extractFilesBase64(files);
    const uploadRecords = files.reduce(
      (acc, file, i) => acc.concat([{ base64: filesBase64[i], tags: getFilenameTags(file.name) }]),
      [],
    );
    let i = uploadRecords.length;

    while (i--) {
      const { base64, tags } = uploadRecords[i];

      await effects.upload({ base64, tags, uid: currentUser.uid });

      setUploadedCount((c) => ++c);
    }

    setIsUploading(false);
    onClose();
  }, [currentUser, files, onClose, setIsUploading, setUploadedCount]);

  return (
    <Modal onClose={onClose}>
      {isUploading ? (
        <UploadingState uploadedCount={uploadedCount} total={files.length} />
      ) : (
        <>
          <div className={classnames(styles.wrapper, modalStyles.scroll)}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Filename</th>
                  <th>Tags</th>
                  <th>MB</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, i) => (
                  <tr key={file.name}>
                    <td>{i + 1}</td>
                    <td>{file.name}</td>
                    <td>{getFilenameTags(file.name).join(', ')}</td>
                    <td>{getMegabytes(file.size)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={modalStyles.buttons}>
            <ProgressButton raised isWaiting={isUploading} onClick={onUpload}>
              Upload
            </ProgressButton>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </>
      )}
    </Modal>
  );
}

function UploadingState({ uploadedCount, total }) {
  return (
    <>
      <h3>
        Uploading {uploadedCount + 1} of {total}
      </h3>
      <LinearProgress />
    </>
  );
}
