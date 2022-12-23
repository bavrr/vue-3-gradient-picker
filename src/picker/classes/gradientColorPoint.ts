import { AlphaIntensity, ColorIntensity, Left } from '../utils';
import ColorPoint from './colorPoint';

export default class GradientColorPoint<
  Alpha extends number = 1
> extends ColorPoint<Alpha> {
  left: Left;

  constructor(
    {
      red,
      green,
      blue,
      alpha,
    }: {
      red: ColorIntensity;
      green: ColorIntensity;
      blue: ColorIntensity;
      alpha: AlphaIntensity<Alpha>;
    },
    left: Left
  ) {
    super({
      red,
      green,
      blue,
      alpha,
    });
    this.left = left;
  }
}
