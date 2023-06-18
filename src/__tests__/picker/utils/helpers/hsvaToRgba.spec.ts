import { ColorPoint } from '@/picker/classes';
import { HSVA } from '@/picker/types';
import { hsvaToRgba } from '@/picker/utils';
import { setRgba } from '@/picker/utils';

jest.mock('@/picker/utils/helpers/setRgba', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((arg) => arg),
}));

describe('Test hsvtToRgb function', () => {
  it.each([
    [
      { hue: 0, saturation: 0, value: 90, alpha: 1 } satisfies HSVA<1>,
      { red: 230, green: 230, blue: 230, alpha: 1 } satisfies ColorPoint<1>,
    ],
    [
      { hue: 60, saturation: 100, value: 100, alpha: 1 } satisfies HSVA<1>,
      { red: 255, green: 255, blue: 0, alpha: 1 } satisfies ColorPoint<1>,
    ],
    [
      { hue: 120, saturation: 0, value: 50, alpha: 0.5 } satisfies HSVA<0.5>,
      { red: 128, green: 128, blue: 128, alpha: 0.5 } satisfies ColorPoint<0.5>,
    ],
    [
      {
        hue: 180,
        saturation: 100,
        value: 50,
        alpha: 0.75,
      } satisfies HSVA<0.75>,
      { red: 0, green: 128, blue: 128, alpha: 0.75 } satisfies ColorPoint<0.75>,
    ],
    [
      {
        hue: 240,
        saturation: 100,
        value: 10,
        alpha: 0.33,
      } satisfies HSVA<0.33>,
      { red: 0, green: 0, blue: 26, alpha: 0.33 } satisfies ColorPoint<0.33>,
    ],
    [
      { hue: 300, saturation: 50, value: 75, alpha: 0.5 } satisfies HSVA<0.5>,
      { red: 191, green: 96, blue: 191, alpha: 0.5 } satisfies ColorPoint<0.5>,
    ],
    [
      { hue: 360, saturation: 100, value: 100, alpha: 1 } satisfies HSVA<1>,
      { red: 255, green: 0, blue: 0, alpha: 1 } satisfies ColorPoint<1>,
    ],
  ])('should return correct rgba by hsva:', (hsva, expected) => {
    const EXPECTED_VALUE = { ...expected };

    const result = hsvaToRgba<typeof hsva.alpha>(hsva);

    expect(setRgba).toHaveBeenCalledWith(EXPECTED_VALUE);
    expect(result).toEqual(EXPECTED_VALUE);
  });

  it('should throw an error for invalid hue', () => {
    const hsva = {
      hue: -2,
      saturation: 100,
      value: 100,
      alpha: 1,
    } as unknown as HSVA<1>;

    expect(() => hsvaToRgba(hsva)).toThrow('Math error');
  });
});
