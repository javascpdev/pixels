const functions = require('firebase-functions');
const context = require('./utilities/prod-context');

// Firestore
const UserUploadOnWrite = require('./src/firestore/user-upload.on-write');
exports.userUploadOnWrite = functions.firestore
  .document('users/{userId}/uploads/{uploadId}')
  .onWrite(UserUploadOnWrite(context));

// HTTPS on-call
const ImgurRefreshOAuth2 = require('./src/https/on-call/imgur-refresh-oauth2.on-call');
exports.imgurRefreshOAuth2 = functions.https.onCall(ImgurRefreshOAuth2(context));

// HTTP onRequest
const Api = require('./src/https/api');
exports.api = functions.https.onRequest(Api(context));
