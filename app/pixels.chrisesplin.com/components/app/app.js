import AlertsHandler from './alerts-handler';
import AlertsProvider from '~/contexts/alerts-context';
import Authorization from './authorization';
import Firebase from './firebase';
import { Head } from 'next/document';
import React from 'react';
import { RecoilRoot } from 'recoil';
import useImmer from '~/hooks/use-immer';
import useServiceWorker from '~/hooks/use-service-worker';

export default function App({ children, secure }) {
  useImmer();
  useServiceWorker();

  return (
    <>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head> */}
      <Firebase />
      <RecoilRoot>
        <Authorization secure={secure} />
        <AlertsProvider>
          <>
            <div id="app">{children}</div>
            <AlertsHandler />
          </>
        </AlertsProvider>
      </RecoilRoot>
    </>
  );
}
