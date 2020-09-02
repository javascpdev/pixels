import constants from '~/constants';

/**
 * Make sure to straddle the pixels
 *
 * https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry
 */
export default function drawLines(ctx, lines, options = {}) {
  const { strokeStyle, lineDashes, lineWidth } = options;
  const straddle = 0.5;

  ctx.strokeStyle = strokeStyle || constants.CONTENT.COLORS.RULER_TICK;
  ctx.lineWidth = lineWidth || 1;

  lineDashes && ctx.setLineDash(lineDashes);

  lines.forEach(({ startX, startY, endX, endY }) => {
    ctx.beginPath();
    ctx.moveTo(startX - straddle, startY - straddle);
    ctx.lineTo(endX - straddle, endY - straddle);
    ctx.stroke();
    ctx.closePath();
  });
}
