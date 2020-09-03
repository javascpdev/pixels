import constants from '~/constants';
import { useEffect } from 'react';
import useFirebase from '~/hooks/use-firebase';
import useRouter from '~/hooks/use-router';

export default function SignOut() {
  const firebase = useFirebase();
  const { redirect } = useRouter();

  useEffect(() => {
    if (firebase) {
      firebase.auth().signOut();

      redirect(constants.ROUTES.ROOT);
    }
  }, [firebase, redirect]);

  return null;
}
