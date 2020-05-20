import { LogoSvg } from '~/svg';
import React from 'react';
import ReactDOM from 'react-dom';

export default function LogoPortal(props) {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(<Logo {...props} />, window.document.getElementById('logo'));
}

const DIMENSIONS = '1.75em';

function Logo({ src }) {
  return src ? (
    <img src={src} alt="logo" style={{ width: DIMENSIONS, height: DIMENSIONS }} />
  ) : (
    <LogoSvg width={DIMENSIONS} height={DIMENSIONS} />
  );
}
