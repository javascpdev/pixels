import clearCanvas from "./clear-canvas";
import getTicks from './get-ticks';
import drawLines from './draw-lines';

export default (ctx, props) => {
  const { width, height } = ctx.canvas;
  const { dpi } = props;
  const ticks = getTicks({ length: width, depth: height, dpi });
  const lines = mapTicks(ticks);

  clearCanvas(ctx);
  drawLines(ctx, lines);
};

function mapTicks(ticks) {
  return ticks.map(({ i, tick }) => ({
    startX: i,
    startY: 0,
    endX: i,
    endY: tick,
  }));
}
