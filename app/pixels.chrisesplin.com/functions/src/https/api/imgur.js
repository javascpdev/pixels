const express = require('express');
const router = express.Router();
const Imgur = require('../../../services/imgur');

module.exports = function ImgurApi(context) {
  const imgur = Imgur(context);

  router.post('/rehost', imgur.rehost);

  return router;
};
