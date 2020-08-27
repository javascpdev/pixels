/* globals window */
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

import * as firebase from 'firebase/app';

import constants from '~/constants';
import { useEffect } from 'react';

export default function useFirebase() {
  useInitializeFirebase();

  return firebase;
}

function useInitializeFirebase() {
  useEffect(() => {
    const firebaseInitialized = firebase.apps.length;

    if (!firebaseInitialized) {
      firebase.initializeApp(constants.FIREBASE);

      window.firebase = firebase;
    }
  }, []);
}
