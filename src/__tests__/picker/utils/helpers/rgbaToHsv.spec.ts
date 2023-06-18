import { ColorPoint } from '@/picker/classes';
import { HSVA } from '@/picker/types';
import { rgbaToHsva } from '@/picker/utils';

describe('Test rgbaToHsva function', () => {
  it.each([
    [
      { red: 255, green: 80, blue: 120, alpha: 1 } satisfies ColorPoint<1>,
      { hue: 346, saturation: 69, value: 100, alpha: 1 } satisfies HSVA<1>,
    ],
    [
      { red: 0, green: 255, blue: 0, alpha: 0.5 } satisfies ColorPoint<0.5>,
      {
        hue: 120,
        saturation: 100,
        value: 100,
        alpha: 0.5,
      } satisfies HSVA<0.5>,
    ],
    [
      { red: 0, green: 0, blue: 255, alpha: 0.75 } satisfies ColorPoint<0.75>,
      {
        hue: 240,
        saturation: 100,
        value: 100,
        alpha: 0.75,
      } satisfies HSVA<0.75>,
    ],
    [
      { red: 0, green: 0, blue: 0, alpha: 1 } satisfies ColorPoint,
      { hue: 0, saturation: 0, value: 0, alpha: 1 } satisfies HSVA,
    ],
    [
      { red: 255, green: 255, blue: 255, alpha: 1 } satisfies ColorPoint,
      { hue: 0, saturation: 0, value: 100, alpha: 1 } satisfies HSVA,
    ],
  ])(
    'should return the correct HSVA values for colorPoint: %p',
    (colorPoint, expected) => {
      const result = rgbaToHsva(colorPoint);

      expect(result).toEqual(expected);
    },
  );
});
