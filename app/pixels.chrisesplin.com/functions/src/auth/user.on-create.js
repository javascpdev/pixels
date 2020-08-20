const AlgoliaUtilities = require('../../services/algolia/algolia-utilities');

module.exports = (context) => {
  const algoliaUtilities = AlgoliaUtilities(context);
  const { admin, environment } = context;

  return async function userOnCreate(user) {
    const options = {
      facetFilters: `userId:${user.uid}`,
    };
    const searchKey = algoliaUtilities.client.generateSecuredApiKey(
      environment.ALGOLIA.SEARCH_API_KEY,
      options
    );

    await admin.auth().setCustomUserClaims(user.uid, { searchKey });

    return { options, searchKey };
  };
};
