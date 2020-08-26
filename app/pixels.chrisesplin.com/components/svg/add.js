import React from 'react';
import constants from '~/constants';

export default function CloseSvg({
  width = 24,
  height = 24,
  fill = constants.COLORS.MDC_THEME_PRIMARY,
  onClick = () => {},
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        fill={fill}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
      />
    </svg>
  );
}
