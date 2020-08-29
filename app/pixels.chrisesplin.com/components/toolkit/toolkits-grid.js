import { BorderInnerSvg, FolderSvg } from '~/svg';

import Link from 'next/link';
import React from 'react';
import constants from '~/constants';
import extensionConstants from '^/constants';
import getEnvironment from '~/utilities/get-environment';
import styles from '~/css/dashboard.module.css';
import useView from '__/hooks/use-view';

const SVG_DIMENSIONS = {
  width: '3em',
  height: '3em',
};

const { IS_EXTENSION } = getEnvironment();

export default function ToolkitsGrid() {
  return (
    <div className={styles.toolkits}>
      <Toolkit
        alt="imgur logo"
        description="Imgur power tools"
        href={constants.ROUTES.TOOLKIT.IMGUR.ROOT}
        src="/images/imgur/imgur-logotype.svg"
        view={extensionConstants.VIEWS.IMGUR.ROOT}
      />
      <Toolkit
        alt="files logo"
        description="Files"
        href={constants.ROUTES.TOOLKIT.FILES.ROOT}
        icon={<FolderSvg {...SVG_DIMENSIONS} fill={constants.COLORS.MDC_THEME_SECONDARY} />}
        view={extensionConstants.VIEWS.FILES.ROOT}
      />
      <Toolkit
        alt="guidelines logo"
        description="Guidelines"
        href={constants.ROUTES.TOOLKIT.GUIDELINES.ROOT}
        icon={<BorderInnerSvg {...SVG_DIMENSIONS} fill={constants.COLORS.MDC_THEME_SECONDARY} />}
        view={extensionConstants.VIEWS.GUIDELINES}
      />
    </div>
  );
}

function Toolkit({ alt, description, href, icon = null, src, view }) {
  const { navigate } = useView();

  return (
    <div className={styles.toolkit}>
      {IS_EXTENSION ? (
        <span className={styles.gridWrapper} onClick={() => navigate(view)}>
          <ToolkitGridItem src={src} alt={alt} icon={icon} description={description} />
        </span>
      ) : (
        <Link href={href}>
          <a>
            <ToolkitGridItem src={src} alt={alt} icon={icon} description={description} />
          </a>
        </Link>
      )}
    </div>
  );
}

function ToolkitGridItem({ src, alt, icon, description }) {
  return (
    <div>
      {src && <img src={src} alt={alt} />}
      {icon}
      <p>{description}</p>
    </div>
  );
}
