import { Button } from '@rmwc/button';
import React from 'react';
import classnames from 'classnames';
import styles from './progress-button.module.css';
import useMinWait from '~/hooks/use-min-wait';

export default function ProgressButton({ isWaiting, minimum, children, className = '', ...props }) {
  const isMinWaiting = useMinWait({ isWaiting, minimum });

  return (
    <Button
      className={classnames(className, styles.progressButton)}
      data-is-indeterminate={isMinWaiting}
      {...props}
    >
      <>
        <div className={styles.progressBar} />
        {children}
      </>
    </Button>
  );
}
