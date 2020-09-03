import { Drawer, DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import React, { useCallback } from 'react';

import { CloseSvg } from '~/svg';
import { IconButton } from '@rmwc/icon-button';
import Link from 'next/link';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import constants from '~/constants';
import extensionConstants from '^/constants';
import getEnvironment from '~/utilities/get-environment';
import styles from './user-drawer.module.css';
import useCurrentUser from '~/hooks/use-current-user';
import useFirebase from '~/hooks/use-firebase';
import useKeyup from '~/hooks/use-keyup';
import useView from '__/hooks/use-view';

const { IS_EXTENSION } = getEnvironment();

export default React.memo((props) => {
  if (!process.browser) {
    return null;
  }

  const el = window.document.querySelector('#right-drawer');

  return ReactDOM.createPortal(<UserDrawer {...props} />, el);
});

function UserDrawer({ isOpen, onClose }) {
  const currentUser = useCurrentUser();
  const handleKeyup = useCallback(
    (e) => {
      const isEscape = e.key == 'Escape';

      isEscape && onClose();
    },
    [onClose],
  );
  const title = currentUser.displayName || <span>&nbsp;</span>;
  const subtitle = currentUser.email;

  useKeyup(handleKeyup);

  return (
    <Drawer className={classnames(styles.drawer, { [styles.isOpen]: isOpen })} dir="ltr">
      <div className={styles.shade} onClick={onClose} />
      <div className={styles.content}>
        <DrawerHeader dir="ltr">
          <IconButton className={styles.closeButton} icon={<CloseSvg />} onClick={onClose} />
          <div className={styles.header}>
            <div className={styles.userIconWrapper}>
              <IconButton icon={currentUser.photoURL} />
            </div>
            <div className={styles.titles}>
              <h6 className={styles.title}>{title}</h6>
              <span className={styles.subtitle}>{subtitle}</span>
            </div>
          </div>
        </DrawerHeader>
        <DrawerContent dir="ltr">
          <List onClick={onClose}>{IS_EXTENSION ? <ExtensionListItems /> : <WebListItems />}</List>
        </DrawerContent>
      </div>
      <div className="flex" />
      <span className={styles.version}>v{constants.VERSION}</span>
    </Drawer>
  );
}

function ExtensionListItems() {
  const { navigate } = useView();
  const firebase = useFirebase();
  const onLogOutClick = useCallback(() => {
    firebase.auth().signOut();

    navigate(extensionConstants.VIEWS.LOGIN);
  }, [firebase, navigate]);

  return (
    <>
      <hr />

      <ListItem onClick={onLogOutClick}>Log Out</ListItem>
    </>
  );
}

function WebListItems() {
  return (
    <>
      <hr />

      <Link key="sign-out" href={constants.ROUTES.META.SIGN_OUT}>
        <a>
          <ListItem>Log Out</ListItem>
        </a>
      </Link>
    </>
  );
}
