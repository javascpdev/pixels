import { LogoSvg } from '~/svg';
import React from 'react';
import ReactDOM from 'react-dom';

export default function LogoPortal() {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(<Logo />, window.document.getElementById('logo'));
}

const DIMENSIONS = '1.75em';

function Logo() {
  return <LogoSvg width={DIMENSIONS} height={DIMENSIONS} />;
}
