import { getHsva } from '@/picker/utils';
import { PositionX, PositionY, HSVA, AlphaIntensity } from '@/picker/types';

type ExampleType<T extends number = 1> = {
  x: PositionX;
  y: PositionY;
  height: number;
  width: number;
  hue: HSVA<T>['hue'];
  alpha: AlphaIntensity<T>;
  result: HSVA<T>;
};

describe('Test getHsv', () => {
  const FIRST_HUE: HSVA['hue'] = 60;
  const FIRST_EXAMPLE: ExampleType<0.7> = {
    x: 10 as PositionX,
    y: 20 as PositionY,
    height: 30,
    width: 40,
    hue: FIRST_HUE,
    alpha: 0.7,
    result: {
      value: 33,
      saturation: 25,
      hue: FIRST_HUE,
      alpha: 0.7,
    },
  };
  const SECOND_HUE: HSVA['hue'] = 160;
  const SECOND_EXAMPLE: ExampleType = {
    x: -10 as PositionX,
    y: 20 as PositionY,
    height: 40,
    width: 40,
    hue: SECOND_HUE,
    alpha: 1,
    result: {
      value: 50,
      saturation: 0,
      hue: SECOND_HUE,
      alpha: 1,
    },
  };
  const THIRD_HUE: HSVA['hue'] = 30;
  const THIRD_EXAMPLE: ExampleType<0.6> = {
    x: 50 as PositionX,
    y: 20 as PositionY,
    height: 30,
    width: 40,
    hue: THIRD_HUE,
    alpha: 0.6,
    result: {
      value: 33,
      saturation: 100,
      hue: THIRD_HUE,
      alpha: 0.6,
    },
  };
  const FOURTH_HUE: HSVA['hue'] = 80;
  const FOURTH_EXAMPLE: ExampleType<0.3> = {
    x: 10 as PositionX,
    y: 50 as PositionY,
    height: 30,
    width: 40,
    alpha: 0.3,
    hue: FOURTH_HUE,
    result: {
      value: 0,
      saturation: 25,
      hue: FOURTH_HUE,
      alpha: 0.3,
    },
  };
  const FIFTH_HUE: HSVA['hue'] = 120;
  const FIFTH_EXAMPLE: ExampleType = {
    x: 50 as PositionX,
    y: 50 as PositionY,
    height: 30,
    width: 40,
    hue: FIFTH_HUE,
    alpha: 1,
    result: {
      value: 0,
      saturation: 100,
      hue: FIFTH_HUE,
      alpha: 1,
    },
  };
  const SIXTH_HUE: HSVA['hue'] = 160;
  const SIXTH_EXAMPLE: ExampleType = {
    x: 10 as PositionX,
    y: -20 as PositionY,
    height: 40,
    width: 40,
    hue: SIXTH_HUE,
    alpha: 1,
    result: {
      value: 100,
      saturation: 25,
      hue: SIXTH_HUE,
      alpha: 1,
    },
  };
  const SEVENTH_HUE: HSVA['hue'] = 160;
  const SEVENTH_EXAMPLE: ExampleType = {
    x: -10 as PositionX,
    y: -20 as PositionY,
    height: 40,
    width: 40,
    hue: SEVENTH_HUE,
    alpha: 1,
    result: {
      value: 100,
      saturation: 0,
      hue: SEVENTH_HUE,
      alpha: 1,
    },
  };

  it.each`
    x                    | y                    | height                    | width                    | hue                    | alpha                    | result
    ${FIRST_EXAMPLE.x}   | ${FIRST_EXAMPLE.y}   | ${FIRST_EXAMPLE.height}   | ${FIRST_EXAMPLE.width}   | ${FIRST_EXAMPLE.hue}   | ${FIRST_EXAMPLE.alpha}   | ${FIRST_EXAMPLE.result}
    ${SECOND_EXAMPLE.x}  | ${SECOND_EXAMPLE.y}  | ${SECOND_EXAMPLE.height}  | ${SECOND_EXAMPLE.width}  | ${SECOND_EXAMPLE.hue}  | ${SECOND_EXAMPLE.alpha}  | ${SECOND_EXAMPLE.result}
    ${THIRD_EXAMPLE.x}   | ${THIRD_EXAMPLE.y}   | ${THIRD_EXAMPLE.height}   | ${THIRD_EXAMPLE.width}   | ${THIRD_EXAMPLE.hue}   | ${THIRD_EXAMPLE.alpha}   | ${THIRD_EXAMPLE.result}
    ${FOURTH_EXAMPLE.x}  | ${FOURTH_EXAMPLE.y}  | ${FOURTH_EXAMPLE.height}  | ${FOURTH_EXAMPLE.width}  | ${FOURTH_EXAMPLE.hue}  | ${FOURTH_EXAMPLE.alpha}  | ${FOURTH_EXAMPLE.result}
    ${FIFTH_EXAMPLE.x}   | ${FIFTH_EXAMPLE.y}   | ${FIFTH_EXAMPLE.height}   | ${FIFTH_EXAMPLE.width}   | ${FIFTH_EXAMPLE.hue}   | ${FIFTH_EXAMPLE.alpha}   | ${FIFTH_EXAMPLE.result}
    ${SIXTH_EXAMPLE.x}   | ${SIXTH_EXAMPLE.y}   | ${FIFTH_EXAMPLE.height}   | ${SIXTH_EXAMPLE.width}   | ${SIXTH_EXAMPLE.hue}   | ${SIXTH_EXAMPLE.alpha}   | ${SIXTH_EXAMPLE.result}
    ${SEVENTH_EXAMPLE.x} | ${SEVENTH_EXAMPLE.y} | ${SEVENTH_EXAMPLE.height} | ${SEVENTH_EXAMPLE.width} | ${SEVENTH_EXAMPLE.hue} | ${SEVENTH_EXAMPLE.alpha} | ${SEVENTH_EXAMPLE.result}
  `(
    'hsv should be $result when x:$x, y:$y, height:$height, width:$width, hue:$hue, alpha: $alpha',
    ({ x, y, height, width, result, hue, alpha }: ExampleType) => {
      expect(
        getHsva<typeof alpha>(x, y, height, width, hue, alpha),
      ).toStrictEqual(result);
    },
  );
});
