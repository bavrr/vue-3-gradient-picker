import { PositionX } from '../../composables/useActionEvents';
import { Hue } from '../types';

export default (offsetX: PositionX, width: number): Hue => {
  let offset = 0;

  if (offsetX > width) {
    offset = width;
  } else if (offset < 0) {
    offset = 0;
  } else {
    offset = offsetX;
  }

  const hue = Math.floor((360 * offset) / width) as Hue;

  if (hue < 0) {
    return 0 as Hue;
  }

  if (hue > 360) {
    return 0 as Hue;
  }

  return hue;
};
