module.exports = ({ admin, environment }) => {
  const db = admin.firestore();
  const rtdb = admin.database();

  return {
    db,
    rtdb,
    getOAuth2Ref: () => db.collectionGroup('oauth2'),
    getUserOAuth2Ref: (userId, serviceId) =>
      db.collection('users').doc(userId).collection('oauth2').doc(serviceId),
  };
};
