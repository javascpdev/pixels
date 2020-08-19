import { DeleteSvg, HighlightOffSvg } from '~/svg';
import React, { useCallback, useMemo, useState } from 'react';

import GalleryImage from '~/ui/gallery-image';
import { IconButton } from '@rmwc/icon-button';
import ReactDOM from 'react-dom';
import effects from '~/effects';
import styles from '../image-toolkits.module.css';
import useMultiSelect from '~/hooks/use-multi-select';
import useSelected from '~/hooks/use-selected';

export default function FilesImages({ uploads }) {
  const [deleting, setDeleting] = useState(new Set());
  const addDeleting = useCallback((ids) =>
    setDeleting((deleting) => new Set([...deleting, ...ids]))
  );
  const ids = useMemo(() => uploads.map((u) => u.__id), [uploads]);
  const { deselectAll, getOnClick, selected } = useMultiSelect({ ids });

  return (
    <>
      <h3>Images</h3>

      <FilesActionMenu
        addDeleting={addDeleting}
        deselectAll={deselectAll}
        selected={selected}
        uploads={uploads}
      />

      <ul className={styles.imageGrid}>
        {uploads
          .filter((image) => !deleting.has(image.__id))
          .map((image) => {
            const isSelected = selected.has(image.__id);

            return (
              <li key={image.__id} onClick={getOnClick(image.__id)}>
                <GalleryImage
                  alt={image.metadata.name}
                  bytes={image.totalBytes}
                  isSelected={isSelected}
                  src={image.downloadURL}
                  tags={image.tags}
                />
              </li>
            );
          })}
      </ul>
    </>
  );
}

function FilesActionMenu({ addDeleting, deselectAll, selected, uploads }) {
  const el = window.document.getElementById('action-menu');
  const onDeleteClick = useCallback(async () => {
    const uploadsToDelete = uploads.filter((u) => selected.has(u.__id));
    let i = uploadsToDelete.length;

    addDeleting([...selected]);

    deselectAll();

    while (i--) {
      let upload = uploadsToDelete[i];

      await effects.deleteUpload(upload);
    }
  }, [addDeleting, deselectAll, selected, uploads]);

  return el && selected.size
    ? ReactDOM.createPortal(
        <>
          <IconButton icon={<HighlightOffSvg />} onClick={deselectAll} />
          <IconButton icon={<DeleteSvg />} onClick={onDeleteClick} />
        </>,
        el
      )
    : null;
}
