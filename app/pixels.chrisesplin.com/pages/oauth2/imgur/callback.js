import React, { useEffect, useMemo } from 'react';

import App from '../../../components/app/app';
import BackButton from '~/top-bar/back-button';
import { LinearProgress } from '@rmwc/linear-progress';
import Title from '~/top-bar/title';
import constants from '~/constants';
import effects from '~/effects';
import styles from '~/css/oauth2-callback.module.css';
import useParams from '../../../components/hooks/use-params';
import useRouter from '~/hooks/use-router';

export default function Callback() {
  const params = useParams();
  const hasParams =
    params?.state &&
    params.access_token &&
    params.expires_in &&
    params.token_type &&
    params.refresh_token &&
    params.account_username &&
    params.account_id;

  return <App secure>{hasParams && <HandleCallback {...params} />}</App>;
}

/**
 * TEST URL
 * https://local.chrisesplin.com/oauth2/imgur/callback?state=Qw9kiGUbYEdnl4Wm1tw8HrZkoeF2#access_token=ba31d0ca624afdfcd8c33e6718dd0c6b4ce11758&expires_in=315360000&token_type=bearer&refresh_token=dc4d8cdd4fa14592c3dde8600b756039839e4c57&account_username=ChrisEsplin&account_id=65967039
 */

function HandleCallback({
  access_token: accessToken,
  account_id: accountId,
  account_username: accountUsername,
  refresh_token: refreshToken,
  state: uid,
}) {
  const { redirect } = useRouter();
  const record = useMemo(() => ({ accessToken, accountId, accountUsername, refreshToken }), [
    accessToken,
    accountId,
    accountUsername,
    refreshToken,
  ]);

  useEffect(() => {
    (async () => {
      await effects.setOAuth2({
        record,
        serviceId: constants.OAUTH2.IMGUR.SERVICE_ID,
        uid,
      });

      redirect(constants.ROUTES.TOOLKIT.IMGUR.ROOT);
    })();
  }, [record, redirect, uid]);

  return (
    <>
      <BackButton href={constants.ROUTES.DASHBOARD} />
      <Title />
      <div className={styles.wrapper}>
        <h1>Connecting Imgur...</h1>
        <br />
        <LinearProgress />
      </div>
    </>
  );
}
