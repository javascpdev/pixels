import '~/app/app.css';
import '~/top-bar/top-bar.css';
import '@material/button/dist/mdc.button.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@rmwc/icon/icon.css';

import App from 'next/app';
import React from 'react';

export default class AppOverride extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
