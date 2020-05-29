import Document, { Head, Main, NextScript } from 'next/document';

import React from 'react';
import constants from '~/constants';

export default class CustomDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
          />
          <meta name="description" content={constants.META.DESCRIPTION} />
          <meta name="theme_color" content={constants.META.THEME_COLOR} />

          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" href="/images/icons/icon-192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="stylesheet" href="https://use.typekit.net/zgw6lpd.css" />
        </Head>
        <body>
          <div id="top-bar">
            <div id="back-button" />
            <div id="logo" />
            <div id="title" />
            <div id="menu" />
          </div>
          <div id="modal" />
          <div id="right-drawer" />
          <div id="uploader" />
          <Main />
          <footer id="footer" />
          <NextScript />
          <noscript>
            <p>Please enable JavaScript to use Pixels.</p>
            <p>Email chris@chrisesplin.com with questions.</p>
          </noscript>
        </body>
      </html>
    );
  }
}
