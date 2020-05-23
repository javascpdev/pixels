import Head from 'next/head';
import React from 'react';
import constants from '~/constants';

const SDK = constants.FIREBASE.SDK;

export default function Firebase() {
  return (
    <Head>
      <script src={`/__/firebase/${SDK}/firebase-app.js`}></script>
      <script src={`/__/firebase/${SDK}/firebase-analytics.js`}></script>
      <script src={`/__/firebase/${SDK}/firebase-auth.js`}></script>
      <script src={`/__/firebase/${SDK}/firebase-firestore.js`}></script>
      <script src={`/__/firebase/${SDK}/firebase-functions.js`}></script>
      {/* <script src={`/__/firebase/${SDK}/firebase-storage.js`}></script> */}
      {/* <script src={`/__/firebase/${SDK}/firebase-messaging.js`}></script> */}
      <script src={`/__/firebase/init.js`}></script>
    </Head>
  );
}
