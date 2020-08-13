import BackButton from '~/top-bar/back-button';
import Logo from '~/top-bar/logo';
import Menu from '~/top-bar/menu';
import React from 'react';
import Title from '~/top-bar/title';
import constants from '~/constants';
import styles from './toolkit.module.css';

export default function Toolkit({ children, icon, src, title }) {
  return (
    <>
      <BackButton href={constants.ROUTES.DASHBOARD} />
      <Logo icon={icon} src={src} />
      <Menu />
      <Title title={title} />
      <div className={styles.toolkit}>
        <menu id="toolkit-menu" />
        <div id="toolkit-body">{children}</div>
      </div>
    </>
  );
}
