import AlertsHandler from './alerts-handler';
import AlertsProvider from '~/contexts/alerts-context';
import Authorization from './authorization';
import React from 'react';
import RootProvider from '~/contexts/root-context';
import useImmer from '~/hooks/use-immer';
import useServiceWorker from '~/hooks/use-service-worker';

export default function App({ children, secure }) {
  useImmer();
  useServiceWorker();

  return (
    <>
      <RootProvider>
        <Authorization secure={secure} />
        <AlertsProvider>
          <>
            <div id="app">{children}</div>
            <AlertsHandler />
          </>
        </AlertsProvider>
      </RootProvider>
    </>
  );
}
