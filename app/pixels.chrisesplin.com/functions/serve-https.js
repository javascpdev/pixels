const express = require('express');
const bodyParser = require('body-parser');
const context = require('./utilities/dev-context');
const Api = require('./src/https/api');

const app = express();
const api = Api(context);
const port = 4000;
const bodyParserOptions = {
  extended: true,
  verify(req, res, buf) {
    req.rawBody = buf;
  },
};

app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.raw(bodyParserOptions));
app.use(bodyParser.text(bodyParserOptions));
app.use(bodyParser.urlencoded(bodyParserOptions));
app.use('/', api);

app.listen(port, () => console.info('listening on port:', port));
