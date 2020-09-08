import constants from '~/constants';

/**
 * Make sure to straddle the pixels
 *
 * https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry
 */
const STRADDLE = 0.5;
export default function drawLines(ctx, lines, options = {}) {
  const { strokeStyle, lineDashes, lineWidth } = options;

  ctx.strokeStyle = strokeStyle || constants.CONTENT.COLORS.RULER_TICK;
  ctx.lineWidth = lineWidth || 1;

  lineDashes && ctx.setLineDash(lineDashes);

  lines.forEach(({ startX, startY, endX, endY }) => {
    ctx.beginPath();
    ctx.moveTo(startX - STRADDLE, startY - STRADDLE);
    ctx.lineTo(endX - STRADDLE, endY - STRADDLE);
    ctx.stroke();
    ctx.closePath();
  });
}
