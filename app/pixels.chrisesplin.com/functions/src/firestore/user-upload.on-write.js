const updateToAlgolia = require('../../services/algolia/update-to-algolia');
const Schema = require('../../utilities/schema');
const batchProcessQuery = require('../../utilities/batch-process-query');

module.exports = (context) => {
  const schema = Schema(context);

  return async function UserUploadOnWrite(change, { params }) {
    const { uploadId, userId } = params;
    const upload = change.after.data();

    return processAlgolia({ environment: context.environment, upload, uploadId, userId });
  };
};

module.exports.processAlgolia = processAlgolia;

async function processAlgolia({ environment, upload, uploadId, userId }) {
  const indexName = environment.ALGOLIA.INDICES.UPLOADS;
  const objectID = uploadId;
  const record = upload && { ...upload, uploadId, userId };

  return updateToAlgolia({ environment, indexName, objectID, record });
}
