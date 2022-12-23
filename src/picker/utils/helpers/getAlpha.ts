import { PositionX } from '../../composables/useActionEvents';

export default (positionX: PositionX, width: number) => {
  const alpha = Number((positionX / width).toFixed(2));

  if (alpha > 1) {
    return 1;
  }

  if (alpha < 0) {
    return 0;
  }

  return alpha;
};
