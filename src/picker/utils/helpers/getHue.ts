import { Hue, PositionX } from '@/picker/types';

export default (offsetX: PositionX, width: number): Hue => {
  let offset = 0;

  if (offsetX > width) {
    offset = width;
  } else if (offsetX < 0) {
    offset = 0;
  } else {
    offset = offsetX;
  }

  const hue = Math.floor((360 * offset) / width) as Hue;

  return hue;
};
