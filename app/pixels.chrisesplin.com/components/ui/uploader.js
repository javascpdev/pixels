import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ReactDOM from 'react-dom';
import UploaderModal from '~/modals/uploader-modal';
import styles from './uploader.module.css';
import { v4 as uuid } from 'uuid';

export default function Uploader({ children, redirectUrl }) {
  const id = useRef(uuid());
  const inputRef = useRef();
  const [dropBase64, setDropBase64] = useState(null);
  const handleLabelClick = useCallback(() => inputRef.current.click(), [inputRef]);
  const { fileBase64, handleInput } = useInputHandler({ inputRef });
  const { isDragging, stopDragging } = useIsDragging();
  const cancelUpload = useCallback(() => {
    inputRef.current.value = '';
    inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    setDropBase64(null);
  }, [inputRef, setDropBase64]);
  const base64 = useMemo(() => dropBase64 || fileBase64, [dropBase64, fileBase64]);

  return (
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
      />
      <UploaderDragAndDrop
        isActive={isDragging}
        stopDragging={stopDragging}
        setBase64={setDropBase64}
      />
      <UploaderModal
        isOpen={!!base64}
        base64={base64}
        onClose={cancelUpload}
        redirectUrl={redirectUrl}
      />
    </form>
  );
}

function UploaderDragAndDrop(props) {
  return ReactDOM.createPortal(
    <DropTarget {...props} />,
    window.document.getElementById('uploader')
  );
}

function DropTarget({ isActive, setBase64, stopDragging }) {
  const handleDrop = useCallback(
    async (e) => {
      blockEvent(e);
      stopDragging();

      const dropBase64 = await extractFilesBase64(e.dataTransfer.files);

      setBase64(dropBase64);
    },
    [stopDragging]
  );

  return (
    isActive && (
      <div
        className={styles.dropTarget}
        onDragLeave={stopDragging}
        onDragEnd={stopDragging}
        onDrop={handleDrop}
        onDragOver={(e) => blockEvent(e)}
      >
        <h2>Drop to upload</h2>
      </div>
    )
  );
}

const DRAG_EL_ID = 'app';
function useIsDragging() {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = useCallback((e) => (blockEvent(e), setIsDragging(true)), [setIsDragging]);
  const stopDragging = useCallback((e) => (blockEvent(e), setIsDragging(false)), [setIsDragging]);

  useEffect(() => {
    const dragEl = window.document.getElementById(DRAG_EL_ID);

    dragEl.addEventListener('dragenter', handleDragEnter);
    dragEl.addEventListener('dragover', handleDragEnter);

    return () => {
      dragEl.removeEventListener('dragenter', handleDragEnter);
      dragEl.removeEventListener('dragover', handleDragEnter);
    };
  }, [handleDragEnter]);

  return { isDragging, stopDragging };
}

function useInputHandler({ inputRef }) {
  const [fileBase64, setFileBase64] = useState(null);
  const handleInput = useCallback(async () => {
    let fileBase64 = inputRef.current.value;

    if (inputRef.current.value) {
      fileBase64 = await extractFilesBase64(inputRef.current.files);
    }

    setFileBase64(fileBase64);
  }, [inputRef, setFileBase64]);

  return { fileBase64, handleInput };
}

async function extractFilesBase64(files) {
  return new Promise((resolve) => {
    const [file] = files;
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result), false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

function blockEvent(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
}
