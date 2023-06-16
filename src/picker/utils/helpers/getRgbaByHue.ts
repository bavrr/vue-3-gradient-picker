import { ColorPoint } from '@/picker/classes';
import { Hue, ColorIntensity, AlphaIntensity } from '@/picker/types';

export default function <T extends number = 1>(
  hue: Hue,
  alpha: AlphaIntensity<T>,
): ColorPoint<T> {
  const H = hue / 60;

  const C = 1;
  const X = C * (1 - Math.abs((H % 2) - 1));

  const precision = 255;
  let r = 0;
  let g = 0;
  let b = 0;

  switch (Math.floor(H)) {
    case 0:
      r = C;
      g = X;
      b = 0;
      break;
    case 1:
      r = X;
      g = C;
      b = 0;
      break;
    case 2:
      r = 0;
      g = C;
      b = X;
      break;
    case 3:
      r = 0;
      g = X;
      b = C;
      break;
    case 4:
      r = X;
      g = 0;
      b = C;
      break;
    case 5:
      r = C;
      g = 0;
      b = X;
      break;
    case 6:
      r = C;
      g = X;
      b = 0;
      break;
    default:
      throw new Error('Math error');
  }

  return new ColorPoint<T>({
    red: Math.round(r * precision) as ColorIntensity,
    green: Math.round(g * precision) as ColorIntensity,
    blue: Math.round(b * precision) as ColorIntensity,
    alpha: alpha,
  });
}
