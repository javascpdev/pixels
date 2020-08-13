import { Chip, ChipSet } from '@rmwc/chip';
import React, { useCallback, useRef, useState } from 'react';

import { Button } from '@rmwc/button';
import { CloseSvg } from '~/svg';
import { TextField } from '@rmwc/textfield';
import constants from '~/constants';
import { produce } from 'immer';
import styles from './files-toolkit.module.css';
import useKeyup from '~/hooks/use-keyup';
import useRouter from '~/hooks/use-router';

const BAD_CHARACTERS = /[^a-zA-Z0-9\s]/g;

export default function ImgurUploadForm({ onUpload, src }) {
  const inputRef = useRef();
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(new Set());
  const { redirect } = useRouter();
  const addTag = useCallback(
    (tag) => {
      const trimmedTag = tag.trim();

      if (trimmedTag) {
        setTags((tags) =>
          produce(tags, (draft) => {
            draft.add(trimmedTag);
          })
        );

        setTag('');
      }
    },
    [setTag, setTags]
  );
  const removeTag = useCallback(
    (tag) =>
      setTags((tags) =>
        produce(tags, (draft) => {
          draft.delete(tag);
        })
      ),
    [setTags]
  );
  const handleAdd = useCallback(() => addTag(tag), [addTag, tag]);
  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      const tag = value.toLowerCase().replace(BAD_CHARACTERS, '');

      setTag(tag);
    },
    [addTag, setTag]
  );
  const onCancel = useCallback(() => redirect(constants.ROUTES.TOOLKIT.FILES.ROOT), [redirect]);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onUpload({ tags: [...tags] });
    },
    [onUpload, tags]
  );

  useKeyup(
    (e) => {
      const isEnter = e.code == 'Enter';
      const isComma = e.code == 'Comma';
      const shouldAdd = isEnter || isComma;

      shouldAdd && handleAdd();
    },
    [handleAdd]
  );

  return (
    <div className={styles.uploadForm}>
      <img src={src} alt="upload preview" />
      <div className={styles.formRow}>
        <TextField
          ref={inputRef}
          value={tag}
          onChange={onChange}
          label="Add tag"
          placeholder="cat pics"
        />
      </div>

      <ChipSet className={styles.chipSet}>
        {[...tags].map((tag) => {
          function onRemove() {
            removeTag(tag);

            inputRef.current.focus();
          }

          return (
            <Chip
              key={`chip-${tag}`}
              checkmark
              label={tag}
              trailingIcon={<CloseSvg width="18" height="18" />}
              onRemove={onRemove}
              onInteraction={onRemove}
              onTrailingIconInteraction={onRemove}
            />
          );
        })}
      </ChipSet>

      <form className={styles.uploadForm} onSubmit={onSubmit}>
        <div className={styles.buttons}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button raised>Upload</Button>
        </div>
      </form>
    </div>
  );
}
