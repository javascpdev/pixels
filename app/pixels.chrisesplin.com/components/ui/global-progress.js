import { LinearProgress } from '@rmwc/linear-progress';
import React from 'react';
import ReactDOM from 'react-dom';

export default function GlobalProgressPortal(props) {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(
    <GlobalProgress {...props} />,
    window.document.getElementById('progress')
  );
}

function GlobalProgress({ show = false, ...props }) {
  return show ? <LinearProgress {...props} /> : null;
}
