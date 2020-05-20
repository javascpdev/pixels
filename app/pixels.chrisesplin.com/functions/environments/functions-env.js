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

if (!config.some_environment) {
  config.some_environment = {
    some_key: 'some value',
  };
}

module.exports = {
  SOME_ENVIRONMENT: {
    some_key: config.some_environment.some_key,
  },
};
