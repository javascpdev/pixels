import React, { useEffect, useRef } from 'react';

import renderGridlines from '+/../canvas/render-gridlines';
import useTab from '+/hooks/use-tab';
import useWorkspace from '+/hooks/use-workspace';

export default function Gridlines({ width, height }) {
  const canvasRef = useRef();
  const tab = useTab();
  const workspace = useWorkspace();
  const dpr = window.devicePixelRatio;

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const offsets = { x: tab.x, y: tab.y };

    renderGridlines({
      ctx,
      guidelines: workspace.guidelines,
      offsets,
    });
  }, [width, height, tab, workspace]);

  return <canvas width={width * dpr} height={height * dpr} ref={canvasRef} />;
}
