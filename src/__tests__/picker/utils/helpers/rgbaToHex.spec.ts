import { rgbaToHex } from '@/picker/utils';
import { ColorPoint } from '@/picker/classes';

type ExampleType<T extends number = 1> = {
  hex: string;
  rgba: ColorPoint<T> | null;
};

describe('Test rgbaToHex function', () => {
  const FIRST_EXAMPLE: ExampleType<0.67> = {
    hex: '234753aa',
    rgba: {
      red: 35,
      green: 71,
      blue: 83,
      alpha: 0.67,
    },
  };
  const SECOND_EXAMPLE: ExampleType<1> = {
    hex: 'ce8412ff',
    rgba: {
      red: 206,
      green: 132,
      blue: 18,
      alpha: 1,
    },
  };
  const THIRD_EXAMPLE: ExampleType<1> = {
    hex: '00000000',
    rgba: null,
  };
  const FOURTH_EXAMPLE: ExampleType<0.27> = {
    hex: '7f11e044',
    rgba: {
      red: 127,
      green: 17,
      blue: 224,
      alpha: 0.27,
    },
  };
  const FIFTH_EXAMPLE: ExampleType<0.04> = {
    hex: '0102080a',
    rgba: {
      red: 1,
      green: 2,
      blue: 8,
      alpha: 0.04,
    },
  };

  it.each`
    rgba                   | hex
    ${FIRST_EXAMPLE.rgba}  | ${FIRST_EXAMPLE.hex}
    ${SECOND_EXAMPLE.rgba} | ${SECOND_EXAMPLE.hex}
    ${THIRD_EXAMPLE.rgba}  | ${THIRD_EXAMPLE.hex}
    ${FOURTH_EXAMPLE.rgba} | ${FOURTH_EXAMPLE.hex}
    ${FIFTH_EXAMPLE.rgba}  | ${FIFTH_EXAMPLE.hex}
  `('should convert $hex to $rgba', ({ hex, rgba }) => {
    expect(rgbaToHex(rgba)).toEqual(hex);
  });
});
