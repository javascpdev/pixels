const algoliasearch = require('algoliasearch');

module.exports = ({ environment }) => {
  const client = algoliasearch(
    environment.ALGOLIA.APPLICATION_ID,
    environment.ALGOLIA.ADMIN_API_KEY
  );

  return {
    initIndex: indexName =>
      client.initIndex(`${environment.ALGOLIA.PREFIX}:${indexName.replace(/\//g, '_')}`),
    deleteObject: index => index.deleteObject.bind(index),
    deleteObjects: index => index.deleteObjects.bind(index),
    saveObject: index => index.saveObject.bind(index),
    saveObjects: index => index.saveObjects.bind(index),
  };
};
