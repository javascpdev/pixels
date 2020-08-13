import App from '~/app/app';
import { Button } from '@rmwc/button';
import { FolderSvg } from '~/svg';
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
          alt="imgur logo"
          description="Imgur power tools"
          href={constants.ROUTES.TOOLKIT.IMGUR.ROOT}
          src="/images/imgur/imgur-logotype.svg"
        />
        <Toolkit
          alt="files logo"
          description="Files"
          href={constants.ROUTES.TOOLKIT.FILES.ROOT}
          icon={<FolderSvg width="3em" height="3em" fill={constants.COLORS.MDC_THEME_SECONDARY} />}
        />
      </div>
    </App>
  );
}

function Toolkit({ alt, description, href, icon = null, src }) {
  return (
    <div className={styles.toolkit}>
      <Link href={href}>
        <a>
          <div>
            {src && <img src={src} alt={alt} />}
            {icon}
            <p>{description}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
