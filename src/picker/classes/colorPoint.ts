import { AlphaIntensity, ColorIntensity } from '@/picker/types';

export default class ColorPoint<Alpha extends number = 1> {
  red: ColorIntensity;
  green: ColorIntensity;
  blue: ColorIntensity;
  alpha: AlphaIntensity<Alpha>;

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
    } = {
      red: 255,
      green: 150,
      blue: 0,
      alpha: 1 as AlphaIntensity<Alpha>,
    },
  ) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
}
