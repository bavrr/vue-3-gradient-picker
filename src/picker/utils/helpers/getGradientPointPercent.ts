import { Left, PositionX } from '@/picker/types';

export default (offsetX: PositionX, width: number) => {
  const leftPercent = Math.floor((offsetX * 100) / width);

  if (leftPercent < 0) {
    return 0 satisfies Left;
  }

  if (leftPercent > 100) {
    return 100 satisfies Left;
  }

  return leftPercent as Left;
};
