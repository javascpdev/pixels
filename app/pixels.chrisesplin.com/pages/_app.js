import '~/app/app.css';
import '~/top-bar/top-bar.css';

import App from 'next/app';
import React from 'react';

export default class AppOverride extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
