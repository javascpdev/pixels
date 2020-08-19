const context = require('../../utilities/dev-context');
const userUploadOnWrite = require('../../src/firestore/user-upload.on-write.js')(context);

(async () => {
  // const change = { after: { data: () => ({ name: 'testing testing 123' }) } };
  const change = { after: { data: () => null } };
  const params = { uploadId: '123', userId: '987' };

  const result = await userUploadOnWrite(change, { params });

  console.log('result', result);

  process.exit();
})();
