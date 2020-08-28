import React, { useCallback } from 'react';

import { ArrowBackSvg } from '~/svg';
import { IconButton } from '@rmwc/icon-button';
import Link from 'next/link';
import ReactDOM from 'react-dom';
import constants from '~/constants';
import extensionConstants from '^/constants';
import getEnvironment from '~/utilities/get-environment';
import useView from '__/hooks/use-view';

const { IS_EXTENSION, IS_BROWSER } = getEnvironment();

export default function BackButtonPortal(props) {
  let node;

  switch (true) {
    case IS_EXTENSION:
      node = <ExtensionBackButton {...props} />;
      break;
    case IS_BROWSER:
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

function ExtensionBackButton({ view = extensionConstants.VIEWS.DEFAULT }) {
  const { navigate } = useView();
  const onClick = useCallback(() => {
    navigate(view);
  }, [view, navigate]);

  return <IconButton icon={<ArrowBackSvg />} onClick={onClick} />;
}
