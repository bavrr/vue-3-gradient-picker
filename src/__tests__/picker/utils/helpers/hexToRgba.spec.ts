import { ColorPoint } from '@/picker/classes';
import { hexToRgba } from '@/picker/utils';

type ExampleType<T extends number = 1> = {
  hex: string;
  rgba: ColorPoint<T> | null;
};

describe('Test hexToRgba function', () => {
  const FIRST_EXAMPLE: ExampleType<0.67> = {
    hex: '#234753aa',
    rgba: {
      red: 35,
      green: 71,
      blue: 83,
      alpha: 0.67,
    },
  };
  const SECOND_EXAMPLE: ExampleType<1> = {
    hex: '#ce8412ff',
    rgba: {
      red: 206,
      green: 132,
      blue: 18,
      alpha: 1,
    },
  };

  const THIRD_EXAMPLE: ExampleType<1> = {
    hex: 'test',
    rgba: null,
  };

  it.each`
    hex                   | rgba
    ${FIRST_EXAMPLE.hex}  | ${FIRST_EXAMPLE.rgba}
    ${SECOND_EXAMPLE.hex} | ${SECOND_EXAMPLE.rgba}
    ${THIRD_EXAMPLE.hex}  | ${THIRD_EXAMPLE.rgba}
  `('should convert $hex to $rgba', ({ hex, rgba }) => {
    expect(hexToRgba(hex)).toEqual(rgba);
  });
});
