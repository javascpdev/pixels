const functions = require('firebase-functions');
const context = require('./utilities/prod-context');

// HTTPS on-call
const ImgurRefreshOAuth2 = require('./src/https/on-call/imgur-refresh-oauth2.on-call');
exports.imgurRefreshOAuth2 = functions.https.onCall(ImgurRefreshOAuth2(context));
