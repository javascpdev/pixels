import { useCallback, useEffect, useMemo } from 'react';

import App from '~/app/app';
import BackButton from '~/top-bar/back-button';
import { Button } from '@rmwc/button';
import Title from '~/top-bar/title';
import constants from '~/constants';
import styles from '~/css/login.module.css';
import useCurrentUser from '~/hooks/use-current-user';
import useFirebase from '~/hooks/use-firebase';
import useRouter from '~/hooks/use-router';

export default function LoginWrapper() {
  return (
    <App>
      <Login />
    </App>
  );
}

function Login() {
  const currentUser = useCurrentUser();
  const { handleGoogleClick } = useClickHandler();
  const { redirect } = useRouter();

  useEffect(() => {
    currentUser && redirect(constants.ROUTES.META.REDIRECT);
  }, [currentUser]);

  return (
    <>
      <BackButton href={constants.ROUTES.ROOT} />
      <Title />
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
