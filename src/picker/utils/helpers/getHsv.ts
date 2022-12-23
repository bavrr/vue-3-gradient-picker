import { PositionX, PositionY } from '../../composables/useActionEvents';
import { HSV } from '../types';

export default (
  x: PositionX,
  y: PositionY,
  height: number,
  width: number,
  hue: HSV['hue']
) => {
  let positionX = x as PositionX;
  let positionY = y as PositionY;

  if (x > width) positionX = width as PositionX;
  if (y > height) positionY = height as PositionY;
  if (x < 0) positionX = 0 as PositionX;
  if (y < 0) positionY = 0 as PositionY;
  const value = Math.round(100 - (positionY * 100) / height);
  const saturation = Math.round((positionX * 100) / width);
  return {
    hue,
    saturation,
    value,
  } as HSV;
};
