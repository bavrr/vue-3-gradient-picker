import { ColorPoint } from '@/picker/classes';
import { ColorIntensity, AlphaIntensity } from '@/picker/types';

const isValidRGBValue = (colorValue: number): colorValue is ColorIntensity =>
  typeof colorValue === 'number' &&
  Number.isNaN(colorValue) === false &&
  colorValue >= 0 &&
  colorValue <= 255;

const isValidAlpha = (
  colorValue: number,
): colorValue is AlphaIntensity<typeof colorValue> =>
  typeof colorValue === 'number' &&
  Number.isNaN(colorValue) === false &&
  colorValue >= 0 &&
  colorValue <= 100;

export default (colorPoint: {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}): null | ColorPoint => {
  if (
    !isValidRGBValue(colorPoint.red) ||
    !isValidRGBValue(colorPoint.green) ||
    !isValidRGBValue(colorPoint.blue)
  ) {
    return null;
  }

  const alpha = isValidAlpha(colorPoint.alpha) ? colorPoint.alpha : 1;

  const color = new ColorPoint({
    red: colorPoint.red,
    green: colorPoint.green,
    blue: colorPoint.blue,
    alpha,
  });

  return color;
};
