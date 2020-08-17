import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@rmwc/button';
import { Select } from '@rmwc/select';
import { TextField } from '@rmwc/textfield';
import constants from '~/constants';
import styles from '../image-toolkits.module.css';
import useImgurAlbums from '~/hooks/use-imgur-albums';
import useRouter from '~/hooks/use-router';

const NEW_ALBUM_OPTION = { label: 'New album', value: '' };

export default function ImgurUploadForm({ canUpload, onUpload, src }) {
  const { redirect } = useRouter();
  const { albums } = useImgurAlbums();
  const [albumId, setAlbumId] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const isNewAlbum = useMemo(() => albumId == NEW_ALBUM_OPTION.value, [albumId]);
  const canSubmit = useMemo(() => canUpload && (!isNewAlbum || albumTitle), [
    canUpload,
    isNewAlbum,
    albumTitle,
  ]);
  const options = useMemo(() => getOptions(albums), [albums]);
  const onAlbumIdChange = useCallback((e) => setAlbumId(e.target.value), [setAlbumId]);
  const onAlbumTitleChange = useCallback((e) => setAlbumTitle(e.target.value), [setAlbumTitle]);
  const onCancel = useCallback(() => redirect(constants.ROUTES.TOOLKIT.IMGUR.ROOT), [redirect]);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onUpload({ albumId, albumTitle });
    },
    [albumId, albumTitle, onUpload]
  );

  useEffect(() => {
    albums.length && setAlbumId(albums[0].id);
  }, [albums, setAlbumId]);

  return (
    <form className={styles.uploadForm} onSubmit={onSubmit}>
      <img src={src} alt="upload preview" />
      <div className={styles.formRow}>
        <Select
          label="Album"
          outlined
          options={options}
          value={albumId}
          onChange={onAlbumIdChange}
        />
      </div>
      {isNewAlbum && (
        <div className={styles.formRow}>
          <TextField
            label="Album Title"
            required
            outlined
            value={albumTitle}
            onChange={onAlbumTitleChange}
          />
        </div>
      )}
      <div className={styles.buttons}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button raised disabled={!canSubmit}>
          Upload
        </Button>
      </div>
    </form>
  );
}

function getOptions(albums) {
  let options = [NEW_ALBUM_OPTION];

  if (!albums.__isLoading) {
    const albumOptions = albums.map((a) => ({ label: a.title, value: a.id }));

    options = options.concat(albumOptions);
  }

  return options;
}
