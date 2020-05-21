const express = require('express');
const cors = require('cors');
const app = express();
const Imgur = require('./imgur');

module.exports = function Webhooks(context) {
  app.use(cors({ origin: true }));

  app.get('/api/health-check', (req, res) => {
    res.send('health check');
  });

  app.use('/api/imgur', Imgur(context));

  return app;
};
