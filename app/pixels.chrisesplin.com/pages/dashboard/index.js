import { BorderInnerSvg, FolderSvg } from '~/svg';

import App from '~/app/app';
import Link from 'next/link';
import Logo from '~/top-bar/logo';
import Menu from '~/top-bar/menu';
import Title from '~/top-bar/title';
import constants from '~/constants';
import styles from '~/css/dashboard.module.css';

const SVG_DIMENSIONS = {
  width: '3em',
  height: '3em',
};

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
          icon={<FolderSvg {...SVG_DIMENSIONS} fill={constants.COLORS.MDC_THEME_SECONDARY} />}
        />
        <Toolkit
          alt="guidelines logo"
          description="Guidelines"
          href={constants.ROUTES.TOOLKIT.GUIDELINES.ROOT}
          icon={<BorderInnerSvg {...SVG_DIMENSIONS} fill={constants.COLORS.MDC_THEME_SECONDARY} />}
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
