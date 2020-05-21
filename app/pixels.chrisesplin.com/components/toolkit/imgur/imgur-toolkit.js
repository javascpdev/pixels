import React, { useMemo } from 'react';

import ImgurConnectPrompt from './imgur-connect-prompt';
import Toolkit from '../toolkit';
import UserOAuth2ContextProvider from '~/contexts/user-oauth2-context';
import constants from '~/constants';
import useUserOAuth2 from '~/hooks/use-user-oauth2';

export default function ImgurToolkitConnected() {
  return (
    <Toolkit src="/images/imgur/imgur-favicon-152.png" title="Imgur">
      <UserOAuth2ContextProvider>
        <ImgurToolkit />
      </UserOAuth2ContextProvider>
    </Toolkit>
  );
}

function ImgurToolkit() {
  const oauth2 = useUserOAuth2({ serviceId: constants.OAUTH2.IMGUR.SERVICE_ID });
  const isLoading = useMemo(() => oauth2 && oauth2.__isLoading, [oauth2]);

  if (isLoading) {
    return null;
  } else if (!oauth2) {
    return <ImgurConnectPrompt />;
  } else {
    return (
      <>
        <h1>ImgurToolkit module</h1>
        <button>refresh Imgur connection</button>
        <button>disconnect Imgur</button>
      </>
    );
  }
}
