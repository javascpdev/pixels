import React, { useCallback, useState } from 'react';

import { BorderInnerSvg } from '~/svg';
import { IconButton } from '@rmwc/icon-button';
import ReactDOM from 'react-dom';
import Toolkit from '../toolkit';
import UserWorkspacesProvider from '~/contexts/user-workspaces-context';
import WorkspaceSelector from '~/ui/workspace-selector';
import constants from '~/constants';
import styles from './guidelines.module.css';

export default function ImgurToolkitConnected() {
  return (
    <Toolkit
      icon={
        <BorderInnerSvg width="2.5em" height="2.5em" fill={constants.COLORS.MDC_THEME_SECONDARY} />
      }
      title="Guidelines"
    >
      <UserWorkspacesProvider>
        <>
          <GuidelinesToolkitMenu />
          <GuidelinesToolkitWrapper />
        </>
      </UserWorkspacesProvider>
    </Toolkit>
  );
}

function GuidelinesToolkitWrapper() {
  return <div className={styles.wrapper}>hey</div>;
}

function GuidelinesToolkitMenu() {
  const el = typeof window != 'undefined' && window.document.getElementById('toolkit-menu');

  return el
    ? ReactDOM.createPortal(
        <>
          <WorkspaceSelector />
        </>,
        el
      )
    : null;
}
