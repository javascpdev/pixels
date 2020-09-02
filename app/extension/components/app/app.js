import './app.css';
import './fonts.css';
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

import {
  Authentication,
  Dashboard,
  FileUpload,
  Files,
  Guidelines,
  Imgur,
  ImgurUpload,
} from '^/views';

import AlertsHandler from '~/app/alerts-handler';
import AlertsProvider from '~/contexts/alerts-context';
import Authorization from './authorization';
import React from 'react';
import RootProvider from '^/contexts/root-context';
import WebRootProvider from '~/contexts/root-context';
import constants from '^/constants';
import useImmer from '~/hooks/use-immer';
import useLiveReload from '^/hooks/use-live-reload';
import useView from '^/hooks/use-view';

export default function AppConnected() {
  useImmer();

  return (
    <WebRootProvider>
      <RootProvider>
        <AlertsProvider>
          <>
            <AlertsHandler />
            <Authorization />
            <App />
          </>
        </AlertsProvider>
      </RootProvider>
    </WebRootProvider>
  );
}

function App() {
  const { view } = useView();

  useLiveReload();

  let content = null;
  switch (true) {
    case view.matches(constants.VIEWS.AUTHENTICATION):
      content = <Authentication />;
      break;

    case view.matches(constants.VIEWS.DASHBOARD):
      content = <Dashboard />;
      break;

    case view.matches(constants.VIEWS.FILES.ROOT):
      content = <Files />;
      break;

    case view.matches(constants.VIEWS.FILES.UPLOAD):
      content = <FileUpload />;
      break;

    case view.matches(constants.VIEWS.GUIDELINES):
      content = <Guidelines />;
      break;

    case view.matches(constants.VIEWS.IMGUR.ROOT):
      content = <Imgur />;
      break;

    case view.matches(constants.VIEWS.IMGUR.UPLOAD):
      content = <ImgurUpload />;
      break;

    default:
      console.error('missing view', view);
      content = <Dashboard />;
  }

  return (
    <>
      <div id="app">{content}</div>
    </>
  );
}
