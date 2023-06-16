import { Saturation } from './saturation';
import { Hue } from './hue';
import { Value } from './value';
import { AlphaIntensity } from './alphaIntensity';

export type HSVA<Alpha extends number = 1> = {
  hue: Hue;
  saturation: Saturation;
  value: Value;
  alpha: AlphaIntensity<Alpha>;
};
