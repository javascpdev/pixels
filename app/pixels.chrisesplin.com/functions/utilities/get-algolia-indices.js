const getAlgoliaClient = require('./get-algolia-client');

module.exports = function getAlgoliaIndices(context) {
  const client = getAlgoliaClient(context);
  const indices = {};

  for (const key in context.ENVIRONMENT.ALGOLIA.INDICES) {
    const index = context.ENVIRONMENT.ALGOLIA.INDICES[key];

    indices[key] = client.initIndex(index);
  }

  return indices;
};
