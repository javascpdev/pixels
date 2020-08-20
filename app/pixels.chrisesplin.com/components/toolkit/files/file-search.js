import React, { useCallback, useEffect, useRef, useState } from 'react';

import { TextField } from '@rmwc/textfield';
import styles from './file-search.module.css';
import useClickOff from '~/hooks/use-click-off';
import useDebouncedValue from '~/hooks/use-debounced-value';
import useKeyup from '~/hooks/use-keyup';

const DEFAULT_QUERY = '';

export default function FileSearch({ children, onIsOpen, onQuery }) {
  const inputRef = useRef();
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const close = useCallback(() => {
    setQuery(DEFAULT_QUERY);
    setIsOpen(false);
  }, [setIsOpen, setQuery]);
  const onChange = useCallback((e) => setQuery(e.target.value), [setQuery]);
  const debouncedQuery = useDebouncedValue(query);

  useKeyup(
    (e) => {
      const isEscape = e.key == 'Escape';
      const isS = e.key == 's';

      if (isEscape) {
        const hasText = !!query;

        hasText ? setQuery(DEFAULT_QUERY) : close();
      } else if (isS && !isOpen) {
        setIsOpen(true);
      }
    },
    [close, isOpen, query, setIsOpen, setQuery]
  );

  useClickOff({ isActive: isOpen, ref: wrapperRef, callback: () => !query && close() }, [
    query,
    close,
    isOpen,
  ]);

  useEffect(() => {
    isOpen && inputRef.current.focus();

    onIsOpen(isOpen);
  }, [isOpen, onIsOpen]);

  useEffect(() => {
    onQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className={styles.fileSearch} data-is-open={isOpen} ref={wrapperRef}>
      <span className={styles.button} onClick={() => setIsOpen(true)}>
        {children}
      </span>
      <TextField
        autoFocus
        ref={inputRef}
        className={styles.search}
        type="text"
        label="Search file tags"
        onChange={onChange}
        value={query}
      />
    </div>
  );
}
