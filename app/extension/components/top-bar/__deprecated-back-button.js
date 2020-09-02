import React, { useCallback } from 'react';

import { ArrowBackSvg } from '~/svg';
import ReactDOM from 'react-dom';
import constants from '^/constants';
import useView from '^/hooks/use-view';

export default function BackButtonPortal(props) {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(
    <BackButton {...props} />,
    window.document.getElementById('back-button'),
  );
}

function BackButton({ view = constants.VIEWS.DEFAULT }) {
  const { navigate } = useView();
  const onClick = useCallback(() => {
    navigate(view);
  }, [view, navigate]);

  return <ArrowBackSvg onClick={onClick} />;
}
