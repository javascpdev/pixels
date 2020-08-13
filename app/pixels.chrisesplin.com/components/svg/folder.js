import React from 'react';
import constants from '~/constants';

export default function FolderSvg({
  width = 24,
  height = 24,
  fill = constants.COLORS.MDC_THEME_PRIMARY,
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} d="M10 4H2v16h20V6H12l-2-2z" />
    </svg>
  );
}
