import { PositionX } from '../../composables/useActionEvents';
import { Left } from '../types';

export default (offsetX: PositionX, width: number) => {
  const leftPercent = Math.floor((offsetX * 100) / width);
  return (leftPercent < 0 ? 0 : leftPercent > 100 ? 100 : leftPercent) as Left;
};
