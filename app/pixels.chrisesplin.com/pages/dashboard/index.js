import App from '~/app/app';
import { Button } from '@rmwc/button';
import Link from 'next/link';
import Logo from '~/top-bar/logo';
import Menu from '~/top-bar/menu';
import Title from '~/top-bar/title';
import constants from '~/constants';
import styles from '~/css/dashboard.module.css';

export default function Index() {
  return (
    <App secure>
      <Logo />
      <Title />
      <Menu />
      <div className={styles.toolkits}>
        <Toolkit
          description="Imgur power tools"
          href={constants.ROUTES.TOOLKIT.IMGUR.ROOT}
          src="/images/imgur/imgur-logotype.svg"
        />
      </div>
    </App>
  );
}

function Toolkit({ description, href, src }) {
  return (
    <div className={styles.toolkit}>
      <Link href={href}>
        <a>
          <div>
            <img src={src} alt="imgur logo" />
            <p>{description}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
