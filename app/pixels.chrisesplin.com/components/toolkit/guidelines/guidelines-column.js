import { AddSvg, CloseSvg } from '~/svg';
import React, { useCallback, useRef } from 'react';

import { IconButton } from '@rmwc/icon-button';
import produce from 'immer';
import styles from './guidelines.module.css';
import { v4 as uuid } from 'uuid';

export default function GuidelinesColumn({ columnName, lines, onChange }) {
  const newLineInputRef = useRef();
  const onAdd = useCallback(
    (e) => {
      e.preventDefault();

      const value = newLineInputRef.current.value;
      const updatedLines = [...lines, { id: uuid(), value }];

      onChange(updatedLines);
    },
    [lines, onChange],
  );
  const getLineOnChange = useCallback(
    (id) => (e) => {
      const value = e.target.value;
      const lineIndex = lines.findIndex((l) => l.id == id);
      const updatedLines = produce(lines, (draft) => {
        draft[lineIndex] = { id, value };
      });

      onChange(updatedLines);
    },
    [lines, onChange],
  );
  const getLineOnDelete = useCallback(
    (id) => () => {
      const lineIndex = lines.findIndex((l) => l.id == id);
      const updatedLines = produce(lines, (draft) => {
        draft.splice(lineIndex, 1);
      });

      onChange(updatedLines);
    },
    [lines, onChange],
  );
  const onFocus = useCallback((e) => e.target.select());

  return (
    <div className={styles.guidelinesColumn}>
      <h2>{columnName}</h2>

      <ul>
        <li key={`add-${columnName}`} className={styles.addWrapper}>
          <form onSubmit={onAdd}>
            <input ref={newLineInputRef} type="number" min={0} defaultValue={0} onFocus={onFocus} />
            <IconButton type="submit" icon={<AddSvg fill="var(--mdc-theme-primary-dark)" />} />
          </form>
        </li>
        {lines?.map((line) => {
          return (
            <li key={line.id}>
              <input
                type="number"
                min={0}
                value={line.value}
                onChange={getLineOnChange(line.id)}
                onFocus={onFocus}
              />
              <IconButton
                icon={<CloseSvg fill="var(--mdc-theme-primary-dark)" />}
                onClick={getLineOnDelete(line.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
