import { setRgba } from '@/picker/utils';
import { ColorPoint } from '@/picker/classes';

jest.mock('@/picker/classes', () => ({
  ColorPoint: jest.fn().mockImplementation((colorPoint: ColorPoint) => ({
    red: colorPoint.red,
    green: colorPoint.green,
    blue: colorPoint.blue,
    alpha: colorPoint.alpha,
  })),
}));

describe('Test setRgba function', () => {
  const invalidRedColorPoint = {
    red: -10,
    green: 100,
    blue: 200,
    alpha: 0.75,
  } as unknow as ColorPoint;
  const invalidGreenColorPoint = {
    red: 50,
    green: 300,
    blue: 200,
    alpha: 0.75,
  } as unknown as ColorPoint;
  const invalidBlueColorPoint = {
    red: 50,
    green: 100,
    blue: -20,
    alpha: 0.75,
  } as unknown as ColorPoint;

  it('should return a ColorPoint object with valid values', () => {
    const COLOR_POINT: ColorPoint<0.75> = {
      red: 50,
      green: 100,
      blue: 200,
      alpha: 0.75,
    };

    const EXPECTED_RESULT = setRgba(COLOR_POINT);

    expect(COLOR_POINT).toEqual(EXPECTED_RESULT);
    expect(ColorPoint).toHaveBeenCalledWith(EXPECTED_RESULT);
  });

  it('should return a ColorPoint object with default alpha value', () => {
    const COLOR_POINT_WITH_OUT_ALPHA = {
      red: 50,
      green: 100,
      blue: 200,
    } as ColorPoint;

    const EXPECTED_RESULT = setRgba(COLOR_POINT_WITH_OUT_ALPHA);

    expect({
      ...COLOR_POINT_WITH_OUT_ALPHA,
      alpha: 1,
    }).toEqual(EXPECTED_RESULT);
    expect(ColorPoint).toHaveBeenCalledWith(EXPECTED_RESULT);
  });
});
