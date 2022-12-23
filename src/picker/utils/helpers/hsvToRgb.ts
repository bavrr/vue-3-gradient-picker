import { HSV } from '../types';
import setRGBA from './setRgba';

export default (hsv: HSV) => {
  const precision = 255;

  const lig = hsv.value / 100;
  const sat = hsv.saturation / 100;
  const H = hsv.hue / 60;

  let C = sat * lig;
  let X = C * (1 - Math.abs((H % 2) - 1));
  let m = lig - C;

  C = Math.floor((C + m) * precision);
  X = Math.floor((X + m) * precision);
  m = Math.floor(m * precision);

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

  return setRGBA({
    red: r,
    green: g,
    blue: b,
    alpha: 1,
  });
};
