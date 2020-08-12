import React from 'react';
import constants from '~/constants';

export default function ArrowBackSvg({
  width = 24,
  height = 24,
  fill = constants.COLORS.MDC_THEME_PRIMARY,
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={fill} d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}
