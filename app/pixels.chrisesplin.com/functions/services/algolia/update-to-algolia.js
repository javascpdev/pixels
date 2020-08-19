const AlgoliaUtilities = require('./algolia-utilities');

module.exports = async function updateToAlgolia({ environment, indexName, objectID, record }) {
  const algoliaUtilities = AlgoliaUtilities({ environment });
  const { initIndex, saveObject, deleteObject } = algoliaUtilities;
  const index = initIndex(indexName);
  const isDeleted = !record;

  if (isDeleted) {
    const deleteFromAlgolia = deleteObject(index);

    await deleteFromAlgolia(objectID);
  } else {
    const saveToAlgolia = saveObject(index);
    const algoliaRecord = getRecordForAlgolia(objectID, record);

    await saveToAlgolia(algoliaRecord);
  }
};

function getRecordForAlgolia(objectID, record) {
  return {
    objectID,
    ...record,
  };
}
