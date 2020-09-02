import Logo from '~/top-bar/logo';
import Menu from '~/top-bar/menu';
import React from 'react';
import Title from '~/top-bar/title';
import ToolkitsGrid from '~/toolkit/toolkits-grid';

export default function Dashboard() {
  return (
    <>
      <Logo />
      <Title />
      <Menu />

      <ToolkitsGrid />
    </>
  );
}
