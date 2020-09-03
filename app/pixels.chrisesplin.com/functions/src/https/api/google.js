const { Storage } = require('@google-cloud/storage');
const express = require('express');
const extractMultipartFormData = require('../../../utilities/extract-multipart-form-data');
const router = express.Router();
const { v4: uuid } = require('uuid');

module.exports = function GoogleApi(context) {
  router.get('/health-check', (req, res) => {
    res.send('health check');
  });

  router.post('/upload', getHandleUpload(context));

  return router;
};

function getHandleUpload(context) {
  return async (req, res) => {
    const { fields, uploads, unlink } = await extractMultipartFormData(req);
    const bucket = new Storage().bucket(context.environment.GOOGLE.BUCKET_TEMP);
    const [uploadResult] = await bucket.upload(uploads.base64, {
      destination: `${uuid()}-${uploads.base64.split('/').pop()}`,
    });
    const base64Link = Buffer.from(uploadResult.metadata.mediaLink).toString('base64');

    await unlink();

    if (fields.target) {
      res.redirect(`${fields.target}?url=${base64Link}`);
    } else {
      res.send(base64Link);
    }
  };
}
