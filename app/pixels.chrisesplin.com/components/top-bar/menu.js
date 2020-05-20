import React, { useState } from 'react';

import { IconButton } from '@rmwc/icon-button';
import ReactDOM from 'react-dom';
import UserDrawer from '~/drawers/user-drawer';
import styles from './top-bar.module.css';
import useCurrentUser from '~/hooks/use-current-user';

export default function MenuPortal(props) {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(<Menu {...props} />, window.document.getElementById('menu'));
}

function Menu({ children }) {
  return children ? <>{children}</> : <UserMenu />;
}

function UserMenu() {
  const currentUser = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  return currentUser ? (
    <>
      <IconButton
        className={styles.userIconButton}
        icon={currentUser.photoURL}
        aria-label="user icon"
        tag="button"
        onClick={() => setIsOpen(true)}
      />
      <UserDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  ) : null;
}
