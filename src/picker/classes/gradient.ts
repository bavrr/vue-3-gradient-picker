import { Degree } from '../utils';
import { GradientType } from '../utils/types/gradientType';
import GradientColorPoint from './gradientColorPoint';

export default class Gradient {
  type: GradientType;
  degree: Degree;
  points: GradientColorPoint[];
  style: string;

  constructor(
    type: GradientType = 'linear',
    degree: Degree = 0 as Degree,
    points: GradientColorPoint[] = [
      new GradientColorPoint(
        {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 1,
        },
        20
      ),
      new GradientColorPoint(
        {
          red: 255,
          green: 0,
          blue: 0,
          alpha: 1,
        },
        100
      ),
    ],
    style = ''
  ) {
    this.type = type;
    this.degree = degree;
    this.points = points;
    this.style = style;
  }
}
