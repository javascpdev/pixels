import './app.css';

import Gridlines from '+/gridlines/gridlines';
import React from 'react';
import RootProvider from '+/contexts/root-context';
import useResizeObserver from 'use-resize-observer';
import useTab from '+/hooks/use-tab';

export default function AppConnected(props) {
  return (
    <RootProvider>
      <App {...props} />
    </RootProvider>
  );
}

function App({ parentNode }) {
  const tab = useTab();
  const { width, height } = useResizeObserver({ ref: { current: parentNode } });

  return !tab?.active ? null : (
    <>
      <Gridlines width={width} height={height} />
    </>
  );
}
