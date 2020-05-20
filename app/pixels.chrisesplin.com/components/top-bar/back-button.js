import { ArrowBackSvg } from '~/svg';
import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom';
import constants from '~/constants';

export default function BackButtonPortal(props) {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(
    <BackButton {...props} />,
    window.document.getElementById('back-button')
  );
}

function BackButton({ href = constants.ROUTES.ROOT }) {
  return (
    <Link href={href}>
      <a>
        <ArrowBackSvg />
      </a>
    </Link>
  );
}
