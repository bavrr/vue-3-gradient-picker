import { HSVA } from '@/picker/types';
import setRgba from '@/picker/utils/helpers/setRgba';

export default function <T extends number = 1>(hsva: HSVA<T>) {
  const precision = 255;

  const lig = hsva.value / 100;
  const sat = hsva.saturation / 100;
  const H = hsva.hue / 60;

  let C = sat * lig;
  let X = C * (1 - Math.abs((H % 2) - 1));
  let m = lig - C;

  C = Math.round((C + m) * precision);
  X = Math.round((X + m) * precision);
  m = Math.round(m * precision);

  let r = 0;
  let g = 0;
  let b = 0;

  switch (Math.floor(H)) {
    case 0:
      r = C;
      g = X;
      b = m;
      break;
    case 1:
      r = X;
      g = C;
      b = m;
      break;
    case 2:
      r = m;
      g = C;
      b = X;
      break;
    case 3:
      r = m;
      g = X;
      b = C;
      break;
    case 4:
      r = X;
      g = m;
      b = C;
      break;
    case 5:
      r = C;
      g = m;
      b = X;
      break;
    case 6:
      r = C;
      g = m;
      b = X;
      break;
    default:
      throw new Error('Math error');
  }

  return setRgba({
    red: r,
    green: g,
    blue: b,
    alpha: hsva.alpha,
  });
}
