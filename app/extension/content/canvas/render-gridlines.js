import clearCanvas from './clear-canvas';
import constants from '^/constants';
import drawLines from './draw-lines';

console.log('constants', constants);

export default ({ color = constants.CONTENT.COLORS.GUIDELINE, ctx, guidelines, offsets }) => {
  const { width, height } = ctx.canvas;
  const horizontalLines = getHorizontalLines(width, guidelines.y, offsets);
  const verticalLines = getVerticalLines(height, guidelines.x, offsets);
  const options = { strokeStyle: color, lineDashes: [5.5, 3.5], lineWidth: 1 };

  clearCanvas(ctx);
  drawLines(ctx, horizontalLines, options);
  drawLines(ctx, verticalLines, options);
};

function getVerticalLines(height, coordinates, offsets) {
  return coordinates
    .map((x) => ({
      startX: x + offsets.x,
      endX: x + offsets.x,
      startY: 0,
      endY: height,
    }))
    .map(mapStraddle);
}

function getHorizontalLines(width, coordinates, offsets) {
  return coordinates
    .map((y) => ({
      startX: 0,
      endX: width,
      startY: y + offsets.y,
      endY: y + offsets.y,
    }))
    .map(mapStraddle);
}

function mapStraddle({ startX, startY, endX, endY }) {
  return {
    startX: straddle(startX),
    startY: straddle(startY),
    endX: straddle(endX),
    endY: straddle(endY),
  };
}

const dpr = window.devicePixelRatio;
function straddle(px) {
  return Math.ceil(px * dpr - 0.5);
}
