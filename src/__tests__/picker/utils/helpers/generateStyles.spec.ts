import { generateGradientStyle, generateSolidStyle } from '@/picker/utils';

import { Degree, GradientType } from '@/picker/types';
import { ColorPoint, GradientColorPoint } from '@/picker/classes';

describe('Test Generate Styles', () => {
  describe('Test generate style for gradient color points', () => {
    const FIRST_EXAMPLE_DEGREE: Degree = 200;
    const FIRST_EXAMPLE_FIRST_POINT: GradientColorPoint = {
      red: 255,
      green: 150,
      blue: 0,
      alpha: 1,
      left: 70,
    };
    const FIRST_EXAMPLE_SECOND_POINT: GradientColorPoint<0.5> = {
      red: 250,
      green: 150,
      blue: 0,
      alpha: 0.5,
      left: 0,
    };
    const FIRST_EXAMPLE_GRADIENT_TYPE: GradientType = 'linear';
    const FIRST_EXAMPLE = {
      POINST: [FIRST_EXAMPLE_FIRST_POINT, FIRST_EXAMPLE_SECOND_POINT],
      GRADIENT_TYPE: FIRST_EXAMPLE_GRADIENT_TYPE,
      DEGREE: FIRST_EXAMPLE_DEGREE,
      RESULT: `linear-gradient(${FIRST_EXAMPLE_DEGREE}deg,rgba(${FIRST_EXAMPLE_SECOND_POINT.red}, ${FIRST_EXAMPLE_SECOND_POINT.green}, ${FIRST_EXAMPLE_SECOND_POINT.blue}, ${FIRST_EXAMPLE_SECOND_POINT.alpha}) ${FIRST_EXAMPLE_SECOND_POINT.left}%,rgba(${FIRST_EXAMPLE_FIRST_POINT.red}, ${FIRST_EXAMPLE_FIRST_POINT.green}, ${FIRST_EXAMPLE_FIRST_POINT.blue}, ${FIRST_EXAMPLE_FIRST_POINT.alpha}) ${FIRST_EXAMPLE_FIRST_POINT.left}%)`,
    };
    const SECOND_EXAMPLE_DEGREE: Degree = 200;
    const SECOND_EXAMPLE_FIRST_POINT: GradientColorPoint = {
      red: 255,
      green: 150,
      blue: 0,
      alpha: 1,
      left: 80,
    };
    const SECOND_EXAMPLE_SECOND_POINT: GradientColorPoint<0.5> = {
      red: 250,
      green: 150,
      blue: 0,
      alpha: 0.5,
      left: 90,
    };
    const SECOND_EXAMPLE_GRADIENT_TYPE: GradientType = 'radial';
    const SECOND_EXAMPLE = {
      POINST: [SECOND_EXAMPLE_FIRST_POINT, SECOND_EXAMPLE_SECOND_POINT],
      GRADIENT_TYPE: SECOND_EXAMPLE_GRADIENT_TYPE,
      DEGREE: SECOND_EXAMPLE_DEGREE,
      RESULT: `radial-gradient(rgba(${SECOND_EXAMPLE_FIRST_POINT.red}, ${SECOND_EXAMPLE_FIRST_POINT.green}, ${SECOND_EXAMPLE_FIRST_POINT.blue}, ${SECOND_EXAMPLE_FIRST_POINT.alpha}) ${SECOND_EXAMPLE_FIRST_POINT.left}%,rgba(${SECOND_EXAMPLE_SECOND_POINT.red}, ${SECOND_EXAMPLE_SECOND_POINT.green}, ${SECOND_EXAMPLE_SECOND_POINT.blue}, ${SECOND_EXAMPLE_SECOND_POINT.alpha}) ${SECOND_EXAMPLE_SECOND_POINT.left}%)`,
    };

    it.each`
      points                   | gradientType                    | degree                   | result
      ${FIRST_EXAMPLE.POINST}  | ${FIRST_EXAMPLE.GRADIENT_TYPE}  | ${FIRST_EXAMPLE.DEGREE}  | ${FIRST_EXAMPLE.RESULT}
      ${SECOND_EXAMPLE.POINST} | ${SECOND_EXAMPLE.GRADIENT_TYPE} | ${SECOND_EXAMPLE.DEGREE} | ${SECOND_EXAMPLE.RESULT}
    `(
      'generated gradient style should be $result for points $points with gradientType $gradient, and gradient degree $degree',
      ({ points, gradientType, degree, result }) => {
        const styleString = generateGradientStyle(points, gradientType, degree);

        expect(styleString).toMatch(result);
      },
    );
  });

  describe('Test generate style for color point', () => {
    const FIRST_EXAMPLE: ColorPoint<0.4> = {
      red: 255,
      green: 6,
      blue: 62,
      alpha: 0.4,
    };

    const SECOND_EXAMPLE: ColorPoint<1> = {
      red: 22,
      green: 1,
      blue: 1,
      alpha: 1,
    };

    it.each`
      colorPoint        | result
      ${FIRST_EXAMPLE}  | ${`rgba(${FIRST_EXAMPLE.red}, ${FIRST_EXAMPLE.green}, ${FIRST_EXAMPLE.blue}, ${FIRST_EXAMPLE.alpha})`}
      ${SECOND_EXAMPLE} | ${`rgba(${SECOND_EXAMPLE.red}, ${SECOND_EXAMPLE.green}, ${SECOND_EXAMPLE.blue}, ${SECOND_EXAMPLE.alpha})`}
    `(
      'generated style should be $result for point $colorPoint',
      ({ colorPoint, result }) => {
        const styleString = generateSolidStyle(colorPoint);

        expect(styleString).toMatch(result);
      },
    );
  });
});
