import { HSVA, PositionX, PositionY } from '@/picker/types';

export default function <T extends number = 1>(
  x: PositionX,
  y: PositionY,
  height: number,
  width: number,
  hue: HSVA<T>['hue'],
  alpha: HSVA<T>['alpha'],
): HSVA<T> {
  let positionX = x as PositionX;
  let positionY = y as PositionY;

  if (x > width) {
    positionX = width as PositionX;
  }

  if (y > height) {
    positionY = height as PositionY;
  }

  if (x < 0) {
    positionX = 0 as PositionX;
  }

  if (y < 0) {
    positionY = 0 as PositionY;
  }

  const value = Math.round(100 - (positionY * 100) / height);
  const saturation = Math.round((positionX * 100) / width);

  return {
    hue,
    saturation,
    value,
    alpha,
  } as HSVA<T>;
}
