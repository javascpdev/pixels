import React, { useCallback, useEffect, useMemo } from 'react';

import BackButton from '~/top-bar/back-button';
import { Button } from '@rmwc/button';
import Logo from '~/top-bar/logo';
import Title from '~/top-bar/title';
import constants from '^/constants';
import styles from '~/css/login.module.css';
import useCurrentUser from '~/hooks/use-current-user';
import useFirebase from '~/hooks/use-firebase';

export default function Authentication() {
  const currentUser = useCurrentUser();
  const { handleGoogleClick } = useClickHandler();

  return (
    <>
      <BackButton view={constants.VIEWS.LANDING} />
      <Title />
      <Logo />
      <div className={styles.wrapper}>
        <Button className={styles.google} raised onClick={handleGoogleClick}>
          Log in with Google
        </Button>
      </div>
    </>
  );
}

function useClickHandler() {
  const firebase = useFirebase();
  const handleGoogleClick = useCallback(() => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);
  }, [firebase]);
  const value = useMemo(() => ({ handleGoogleClick }), [handleGoogleClick]);

  return value;
}
