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

if (isConfigMissing(config.firebase)) {
  config.firebase = {
    projectId: process.env.FIREBASE_PROJECT,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  };
}

if (isConfigMissing(config.imgur)) {
  config.imgur = {
    client_id: process.env.IMGUR_CLIENT_ID,
    client_secret: process.env.IMGUR_CLIENT_SECRET,
  };
}

module.exports = {
  FIREBASE: {
    PROJECT_ID: config.firebase.projectId,
    DATABASE_URL: config.firebase.databaseURL,
  },
  IMGUR: {
    CLIENT_ID: config.imgur.client_id,
    CLIENT_SECRET: config.imgur.client_secret,
    ROUTES: {
      AUTHORIZE: `https://api.imgur.com/oauth2/authorize?client_id=${config.imgur.client_id}&response_type=token&state=APPLICATION_STATE`,
      REFRESH: 'https://api.imgur.com/oauth2/token',
    },
    SERVICE_ID: 'imgur',
  },
};

function isConfigMissing(config) {
  return !config || !Object.keys(config).length
}