import { RootContext as WebRootContext } from '~/contexts/root-context';
import constants from '^/constants';
import localforage from '~/localforage';
import { useContext } from 'react';
import { useEffect } from 'react';
import useFirebase from '~/hooks/use-firebase';
import useView from '^/hooks/use-view';

export default function Authorization() {
  const secure = true;
  const firebase = useFirebase();
  const { view, navigate } = useView();
  const { currentUser, setCurrentUser } = useContext(WebRootContext);

  useEffect(() => {
    const isAuth = view.matches(constants.VIEWS.AUTHENTICATION);

    (async () => {
      if (secure && currentUser === null && !isAuth) {
        await localforage.setLoginRedirect(view.value);

        navigate('AUTHENTICATION');
      } else if (isAuth && currentUser) {
        const loginRedirect = await localforage.getLoginRedirect();

        await localforage.setLoginRedirect(undefined);

        navigate(loginRedirect || 'DEFAULT');
      }
    })();
  }, [currentUser, secure, view]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return null;
}
