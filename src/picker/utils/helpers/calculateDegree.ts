import { PositionX, PositionY } from '@/picker/composables/useActionEvents';
import { Degree } from '../types';

export default (position: {
  positionX: PositionX;
  positionY: PositionY;
  centerX: number;
  centerY: number;
}): Degree => {
  const X = position.positionX - position.centerX;

  const Y = position.positionY - position.centerY;

  const radians = Math.atan2(Y, X);

  const calculatedDegree = Math.round(radians * (180 / Math.PI)) + 90;

  return (
    calculatedDegree >= 0 ? calculatedDegree : calculatedDegree + 360
  ) as Degree;
};
