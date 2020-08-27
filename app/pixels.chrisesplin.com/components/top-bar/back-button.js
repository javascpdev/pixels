import React, { useCallback } from 'react';

import { ArrowBackSvg } from '~/svg';
import { IconButton } from '@rmwc/icon-button';
import Link from 'next/link';
import ReactDOM from 'react-dom';
import constants from '~/constants';
import useView from '__/hooks/use-view';

export default function BackButtonPortal(props) {
  const isServer = typeof window == 'undefined';
  const isExtension = !isServer && location.protocol == 'chrome-extension:';
  let node;

  switch (true) {
    case isServer:
      break;
    case isExtension:
      node = <ExtensionBackButton {...props} />;
      break;

    default:
      node = <WebBackButton {...props} />;
      break;
  }

  return node ? ReactDOM.createPortal(node, window.document.getElementById('back-button')) : null;
}

function WebBackButton({ href = constants.ROUTES.ROOT }) {
  return (
    <Link href={href}>
      <a>
        <ArrowBackSvg />
      </a>
    </Link>
  );
}

function ExtensionBackButton({ view = constants.VIEWS.DEFAULT }) {
  const { navigate } = useView();
  const onClick = useCallback(() => {
    navigate(view);
  }, [view, navigate]);

  return <IconButton icon={<ArrowBackSvg />} onClick={onClick} />;
}
