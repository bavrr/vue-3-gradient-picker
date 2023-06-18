import { ColorPoint } from '@/picker/classes';
import { getRgbaByHue } from '@/picker/utils';
import { Hue, AlphaIntensity } from '@/picker/types';

jest.mock('@/picker/classes', () => ({
  ColorPoint: jest.fn().mockImplementation((colorPoint: ColorPoint) => ({
    red: colorPoint.red,
    green: colorPoint.green,
    blue: colorPoint.blue,
    alpha: colorPoint.alpha,
  })),
}));

type EXAMPLE_TYPE<Alpha extends number = 1> = {
  hue: Hue;
  alpha: AlphaIntensity<Alpha>;
  result: ColorPoint<Alpha>;
};

describe('Test getRgbByHue', () => {
  it('should return a color point', () => {
    const EXPECTED_RESULT: ColorPoint<1> = {
      red: 0,
      green: 255,
      blue: 0,
      alpha: 1,
    };

    const colorPoint = getRgbaByHue(120, 1);

    expect(colorPoint).toEqual(EXPECTED_RESULT);
    expect(ColorPoint).toHaveBeenCalledWith(EXPECTED_RESULT);
  });

  describe('Test return value by hue', () => {
    const FIRST_EXAMPLE: EXAMPLE_TYPE = {
      hue: 0,
      alpha: 1,
      result: {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
      },
    };
    const SECOND_EXAMPLE: EXAMPLE_TYPE = {
      hue: 60,
      alpha: 1,
      result: {
        red: 255,
        green: 255,
        blue: 0,
        alpha: 1,
      },
    };
    const THIRD_EXAMPLE: EXAMPLE_TYPE = {
      hue: 120,
      alpha: 1,
      result: {
        red: 0,
        green: 255,
        blue: 0,
        alpha: 1,
      },
    };
    const FOURTH_EXAMPLE: EXAMPLE_TYPE = {
      hue: 180,
      alpha: 1,
      result: {
        red: 0,
        green: 255,
        blue: 255,
        alpha: 1,
      },
    };
    const FIFTH_EXAMPLE: EXAMPLE_TYPE = {
      hue: 240,
      alpha: 1,
      result: {
        red: 0,
        green: 0,
        blue: 255,
        alpha: 1,
      },
    };
    const SIXTH_EXAMPLE: EXAMPLE_TYPE<0.5> = {
      hue: 300,
      alpha: 0.5,
      result: {
        red: 255,
        green: 0,
        blue: 255,
        alpha: 0.5,
      },
    };
    const SEVENTH_EXAMPLE: EXAMPLE_TYPE<0.4> = {
      hue: 360,
      alpha: 0.4,
      result: {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 0.4,
      },
    };

    it.each`
      hue                    | alpha                    | result
      ${FIRST_EXAMPLE.hue}   | ${FIRST_EXAMPLE.alpha}   | ${FIRST_EXAMPLE.result}
      ${SECOND_EXAMPLE.hue}  | ${SECOND_EXAMPLE.alpha}  | ${SECOND_EXAMPLE.result}
      ${THIRD_EXAMPLE.hue}   | ${THIRD_EXAMPLE.alpha}   | ${THIRD_EXAMPLE.result}
      ${FOURTH_EXAMPLE.hue}  | ${FOURTH_EXAMPLE.alpha}  | ${FOURTH_EXAMPLE.result}
      ${FIFTH_EXAMPLE.hue}   | ${FIFTH_EXAMPLE.alpha}   | ${FIFTH_EXAMPLE.result}
      ${SIXTH_EXAMPLE.hue}   | ${SIXTH_EXAMPLE.alpha}   | ${SIXTH_EXAMPLE.result}
      ${SEVENTH_EXAMPLE.hue} | ${SEVENTH_EXAMPLE.alpha} | ${SEVENTH_EXAMPLE.result}
    `(
      'color point should be $result by hue:$hue, alpha: $alpha',
      ({ hue, result, alpha }: EXAMPLE_TYPE) => {
        expect(getRgbaByHue<typeof alpha>(hue, alpha)).toEqual(result);
      },
    );

    it('should throw an error if the hue is out of range', () => {
      const invalidHue = -10 as Hue;

      expect(() => getRgbaByHue(invalidHue, 1)).toThrow('Math error');
    });
  });
});
