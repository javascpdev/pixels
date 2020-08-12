const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const fs = require('fs');

module.exports = function extractMultipartFormData(req) {
  return new Promise((resolve, reject) => {
    if (req.method != 'POST') {
      return reject(405);
    } else {
      const busboy = new Busboy({ headers: req.headers });
      const tmpdir = os.tmpdir();
      const fields = {};
      const fileWrites = [];
      const uploads = {};

      busboy.on('field', (fieldname, val) => (fields[fieldname] = val));

      busboy.on('file', (fieldname, file, filename) => {
        const filepath = path.join(tmpdir, filename);
        const writeStream = fs.createWriteStream(filepath);

        uploads[fieldname] = filepath;

        file.pipe(writeStream);

        const promise = new Promise((resolve, reject) => {
          file.on('end', () => {
            writeStream.end();
          });
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        fileWrites.push(promise);
      });

      busboy.on('finish', async () => {
        await Promise.all(fileWrites);

        async function unlink() {
          for (const file in uploads) {
            const filename = uploads[file];

            await new Promise((resolve, reject) =>
              fs.unlink(filename, (err) => (err ? reject(err) : resolve()))
            );
          }
        }

        resolve({ fields, uploads, unlink });
      });

      busboy.on('error', reject);

      if (req.rawBody) {
        busboy.end(req.rawBody);
      } else {
        req.pipe(busboy);
      }
    }
  });
};
