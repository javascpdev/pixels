const express = require('express');
const cors = require('cors');
const app = express();
const Google = require('./google');
const Imgur = require('./imgur');

module.exports = function Api(context) {
  app.use(cors({ origin: true }));

  app.get('/health-check', (req, res) => {
    res.send('health check');
  });

  app.use('/google', Google(context));
  app.use('/imgur', Imgur(context));

  return app;
};
