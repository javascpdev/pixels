/* globals window */
export default {
  getStorageRefFromPath: (path) => {
    return storage().ref(path);
  },
  getFirestoreRefFromPath: (path) => {
    return path.split('/').reduce((ref, part, i) => {
      const isDoc = i % 2;

      return isDoc ? ref.doc(part) : ref.collection(part);
    }, db());
  },
  getUserRef: (uid) => db().collection('users').doc(uid),
  getUserOAuth2Ref: (uid) => db().collection('users').doc(uid).collection('oauth2'),
  getUserOAuth2ItemRef: (uid, serviceId) =>
    db().collection('users').doc(uid).collection('oauth2').doc(serviceId),
};

function db() {
  return window.firebase.firestore();
}

function rtdb() {
  const isBrowser = typeof window != 'undefined';

  return isBrowser ? window.firebase.database() : mockRtdb();
}

function storage() {
  return window.firebase.storage();
}

function mockRtdb() {
  const snapshot = {
    val: () => ({}),
  };

  return {
    ref: () => mockRtdb(),
    child: () => mockRtdb(),
    once: async () => snapshot,
    on: () => {},
  };
}
