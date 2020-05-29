import React, { useEffect } from 'react';

import { CloseSvg } from '~/svg';
import { IconButton } from '@rmwc/icon-button';
import styles from './modal.module.css';
import useKeyup from '~/hooks/use-keyup';

const MODAL_OPEN_CLASS = 'modal-open';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.classList.add(MODAL_OPEN_CLASS);

    return () => document.body.classList.remove(MODAL_OPEN_CLASS);
  }, []);

  useKeyup((e) => {
    const isEscape = e.key == 'Escape';

    isEscape && onClose();
  });

  return (
    <div className={styles.modal}>
      <menu>
        <IconButton icon={<CloseSvg />} onClick={onClose} />
      </menu>

      <section>{children}</section>
    </div>
  );
}
