import React from 'react';
import constants from '~/constants';

export default function ArrowForwardSvg({
  width = 24,
  height = 24,
  fill = constants.COLORS.MDC_THEME_PRIMARY,
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}
