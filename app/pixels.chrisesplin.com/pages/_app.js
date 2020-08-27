import '@material/button/dist/mdc.button.css';
import '@material/card/dist/mdc.card.css';
import '@material/chips/dist/mdc.chips.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/linear-progress/dist/mdc.linear-progress.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@material/select/dist/mdc.select.css';
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@rmwc/icon/icon.css';
import '@rmwc/select/select.css';
import '~/app/app.css';
import '~/top-bar/top-bar.css';

import App from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class AppOverride extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
