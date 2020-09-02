import clearCanvas from './clear-canvas';
import getTicks from './get-ticks';
import drawLines from './draw-lines';

export default (ctx, props) => {
  const { width, height } = ctx.canvas;
  const { dpi } = props;
  const ticks = getTicks({ length: height, depth: width, dpi });
  const lines = mapTicks(ticks);

  clearCanvas(ctx);
  drawLines(ctx, lines);
};

function mapTicks(ticks) {
  return ticks.map(({ i, tick }) => ({
    startX: 0,
    startY: i,
    endX: tick,
    endY: i,
  }));
}
