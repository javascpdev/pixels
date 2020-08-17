import { Button } from '@rmwc/button';
import React from 'react';
import constants from '~/constants';
import styles from '../image-toolkits.module.css';
import useCurrentUser from '~/hooks/use-current-user';
import useEnvironment from '~/hooks/use-environment';

export default function ImgurConnectPrompt() {
  const currentUser = useCurrentUser();
  const environment = useEnvironment();

  return (
    <div className={styles.connectPrompt}>
      <h3>Connect Imgur</h3>

      <p>
        You'll need to connect your <a href="https://imgur.com/">Imgur</a> account to use these
        tools
      </p>

      <a
        className={styles.buttonLink}
        href={constants.ROUTES.TOOLKIT.IMGUR.AUTHORIZE({
          clientId: environment.imgur.clientId,
          uid: currentUser && currentUser.uid,
        })}
      >
        <Button raised>Connect Imgur</Button>
      </a>
    </div>
  );
}
