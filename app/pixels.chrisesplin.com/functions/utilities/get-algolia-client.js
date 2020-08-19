const algoliasearch = require('algoliasearch');

module.exports = function getAlgoliaClient(context) {
  const { APPLICATION_ID, API_KEY } = context.environment.ALGOLIA;
  const client = algoliasearch(APPLICATION_ID, API_KEY);

  return client;
};
