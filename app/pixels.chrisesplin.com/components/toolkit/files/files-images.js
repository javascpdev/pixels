import { ContentCopySvg, DeleteSvg, HighlightOffSvg } from '~/svg';
import React, { useCallback, useMemo, useState } from 'react';

import GalleryImage from '~/ui/gallery-image';
import GlobalProgress from '~/ui/global-progress';
import { IconButton } from '@rmwc/icon-button';
import ReactDOM from 'react-dom';
import copyToClipboard from '~/utilities/copy-to-clipboard';
import effects from '~/effects';
import styles from '../image-toolkits.module.css';
import useAlert from '~/hooks/use-alert';
import useAlgolia from '~/hooks/use-algolia';
import useMultiSelect from '~/hooks/use-multi-select';

export default function FilesImages({ deleteUploads, isSearching, query, uploads }) {
  const ids = useMemo(() => uploads.map((u) => u.__id), [uploads]);
  const { deselectAll, getOnClick, selected } = useMultiSelect({ ids });
  const searchResults = useAlgolia({ query, indexKey: 'uploads' });
  const images = !!query ? searchResults.hits : uploads;

  return (
    <>
      <FilesActionMenu
        targetId="action-menu"
        deleteUploads={deleteUploads}
        deselectAll={deselectAll}
        selected={selected}
        uploads={uploads}
      />

      {!uploads.length ? (
        <EmptyState />
      ) : (
        <ul className={styles.imageGrid}>
          {images.map((image, i) => {
            const imageId = image.__id || image.objectID;
            const isSelected = selected.has(imageId);
            const showImageControls = isSelected && selected.size == 1;

            return (
              <li key={`${imageId}-${i}`} onClick={getOnClick(imageId)}>
                {showImageControls && (
                  <FilesActionMenu
                    targetId={`image-controls-${imageId}`}
                    deleteUploads={deleteUploads}
                    deselectAll={deselectAll}
                    selected={selected}
                    uploads={uploads}
                  />
                )}
                <GalleryImage
                  imageId={imageId}
                  alt={image.metadata.name}
                  bytes={image.totalBytes}
                  isSearching={isSearching}
                  isSelected={isSelected}
                  src={image.downloadURL}
                  tags={image?._highlightResult?.tags || image.tags}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function EmptyState() {
  return <h2 style={{ textAlign: 'center' }}>Upload an image to get started</h2>;
}

function FilesActionMenu({ targetId, ...props }) {
  const el = typeof window != 'undefined' && window.document.getElementById(targetId);

  return el ? ReactDOM.createPortal(<FileActions {...props} />, el) : null;
}

function FileActions({ deleteUploads, deselectAll, selected, uploads }) {
  const alert = useAlert();
  const [progress, setProgress] = useState(1);
  const selectedUploads = useMemo(() => uploads.filter((u) => selected.has(u.__id)), [
    selected,
    uploads,
  ]);
  const onDeleteClick = useCallback(async () => {
    deleteUploads([...selected]);

    deselectAll();

    setProgress(0);

    const denominator = selectedUploads.length;
    let i = selectedUploads.length;
    while (i--) {
      const progress = (denominator - i) / denominator;
      let upload = selectedUploads[i];

      await effects.deleteUpload(upload);

      setProgress(progress);
    }

    setProgress(1);
  }, [deleteUploads, deselectAll, selected, selectedUploads, setProgress]);
  const onCopyClick = useCallback(() => {
    const downloadURLs = selectedUploads.map((u) => u.downloadURL);
    const copyString = downloadURLs.join('\n\n');

    copyToClipboard(copyString);

    console.info(copyString);

    alert('copied');
  }, [alert, selectedUploads]);

  return (
    <>
      <GlobalProgress progress={progress} show={progress < 1 || undefined} />
      {selected.size ? (
        <>
          <IconButton icon={<HighlightOffSvg />} onClick={deselectAll} />
          <IconButton icon={<ContentCopySvg />} onClick={onCopyClick} />
          <div className="flex" />
          <IconButton icon={<DeleteSvg fill="var(--color-warning)" />} onClick={onDeleteClick} />
        </>
      ) : null}
    </>
  );
}
