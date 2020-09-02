export default function getTicks({ length, depth, dpi }) {
  const ticks = [];
  let increment = 3;
  let i = 0;

  if (!(dpi % 6)) {
    increment = 6;
  } else if (!(dpi % 5)) {
    increment = 5;
  } else if (!(dpi % 4)) {
    increment = 4;
  } else if (!(dpi % 3)) {
    increment = 3;
  } else if (!(dpi % 2)) {
    increment = 2;
  } 

  while (i < length) {
    let tick = (1 / 3) * depth;

    i = i + increment;

    // 72, 36, 12
    if (!(i % dpi)) {
      tick = depth;
    } else if (!(i % (8 * increment))) {
      tick = (4 / 6) * depth;
    } else if (!(i % (2 * increment))) {
      tick = (3 / 6) * depth;
    }

    ticks.push({ i, tick: Math.ceil(tick) });
  }

  return ticks;
}
