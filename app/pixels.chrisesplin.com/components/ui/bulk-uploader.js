import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import BulkUploadModal from '~/modals/bulk-upload-modal';
import ReactDOM from 'react-dom';
import styles from './uploader.module.css';
import { v4 as uuid } from 'uuid';

export default function BulkUploader({ children }) {
  const id = useRef(uuid());
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const handleLabelClick = useCallback(() => inputRef.current.click(), [inputRef]);
  const handleInput = useCallback((e) => setFiles([...e.target.files]), [files]);
  const cancelUpload = useCallback(() => {
    inputRef.current.value = '';
    inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    setFiles([]);
  }, [inputRef, setFiles]);

  return (
    <>
      <form onSubmit={blockEvent}>
        <label htmlFor={id.current} onClick={handleLabelClick}>
          {children}
        </label>
        <input
          id={id.current}
          ref={inputRef}
          className={styles.input}
          type="file"
          onChange={handleInput}
          multiple
        />
      </form>
      <BulkUploadModal isOpen={files.length} files={files} onClose={cancelUpload} />
    </>
  );
}

function blockEvent(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
}
