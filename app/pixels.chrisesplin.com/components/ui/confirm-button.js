import React, { useEffect, useState } from 'react';

import { Button } from '@rmwc/button';
import classnames from 'classnames';
import styles from './confirm-button.module.css';

export default function ConfirmButton({
  children,
  onClick,
  confirmText = 'confirm',
  className,
  ...buttonProps
}) {
  const [disabled, setDisabled] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isConfirming) {
      let localTimer;

      setTimer(timer => {
        clearTimeout(timer);

        localTimer = setTimeout(() => setIsConfirming(false), 1000 * 2);

        return localTimer;
      });

      return () => clearTimeout(localTimer);
    }
  }, [isConfirming, setTimer]);

  return (
    <Button
      className={classnames(styles.confirmButton, className)}
      disabled={disabled}
      data-is-confirming={String(isConfirming)}
      {...buttonProps}
      onClick={async e => {
        e.preventDefault();

        if (isConfirming) {
          clearTimeout(timer);
          setDisabled(true);

          return onClick(e);
        } else {
          setIsConfirming(true);
        }
      }}
    >
      {isConfirming ? confirmText : children}
    </Button>
  );
}
