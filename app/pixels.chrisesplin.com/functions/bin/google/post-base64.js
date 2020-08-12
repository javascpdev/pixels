const fs = require('fs');
const request = require('request');
const path = require('path');

(async () => {
  const filepath = path.resolve(__dirname, '../../data/sample-base64.txt');

  request.post(
    {
      url: 'http://localhost:4000/api/google/upload',
      // url: 'https://us-central1-quiver-pixels-2020.cloudfunctions.net/api/google/upload',
      formData: {
        base64: fs.createReadStream(filepath),
      },
    },
    function cb(err, httpResponse, body) {
      if (err) {
        console.error('upload failed:', err);
      } else {
        console.log('Upload successful!  Server responded with:', body);
      }
    }
  );
})();
