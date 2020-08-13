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

function Logo({ icon, src }) {
  if (icon) {
    return <>{icon}</>;
  } else if (src) {
    return <img src={src} alt="logo" style={{ width: DIMENSIONS, height: DIMENSIONS }} />;
  } else {
    return <LogoSvg width={DIMENSIONS} height={DIMENSIONS} />;
  }
}
