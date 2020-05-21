/**
 * The following two if-blocks are merely to suppress warnings in dev
 */
if (!process.env.FIREBASE_CONFIG) {
  process.env.FIREBASE_CONFIG = {};
}
if (!process.env.GCLOUD_PROJECT) {
  process.env.GCLOUD_PROJECT = 'fake-project';
}

const functions = require('firebase-functions');
let config = functions.config();

if (!config.imgur) {
  config.imgur = {
    client_id: process.env.IMGUR_CLIENT_ID,
    client_secret: process.env.IMGUR_CLIENT_SECRET,
  };
}

module.exports = {
  IMGUR: {
    CLIENT_ID: config.imgur.client_id,
    CLIENT_SECRET: config.imgur.client_secret,
    AUTH_URL: 'https://api.imgur.com/oauth2/authorize',
    ACCESS_TOKEN_URL: 'https://api.imgur.com/oauth2/token',
    ROUTES: {
      AUTHORIZE: `https://api.imgur.com/oauth2/authorize?client_id=${config.imgur.client_id}&response_type=token&state=APPLICATION_STATE`,
    },
  },
};
