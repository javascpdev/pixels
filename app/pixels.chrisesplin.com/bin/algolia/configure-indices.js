const environment = require('../../functions/environments/functions-env');
const AlgoliaUtilities = require('../../functions/services/algolia/algolia-utilities');
const indexDetails = require('../../functions/services/algolia/index-details.json');

(async () => {
  console.info('Configuring Algolia indices..');

  await configureAlgoliaWithEnvironment(environment);

  console.info('Configuration complete.');
})();

async function configureAlgoliaWithEnvironment(environment) {
  const algoliaUtilities = AlgoliaUtilities({ environment });
  let i = indexDetails.length;

  while (i--) {
    const { indexName, settings } = indexDetails[i];
    const index = algoliaUtilities.initIndex(indexName);

    await index.setSettings(settings);
  }
}
