import { ColorPoint } from '../../classes';
import { HSV } from '../types';

export default (colorPoint: ColorPoint) => {
  let rr;
  let gg;
  let bb;
  let h;
  let s;

  const rabs = colorPoint.red / 255;
  const gabs = colorPoint.green / 255;
  const babs = colorPoint.blue / 255;
  const v = Math.max(rabs, gabs, babs);
  const diff = v - Math.min(rabs, gabs, babs);
  const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h && h < 0) {
      h += 1;
    } else if (h && h > 1) {
      h -= 1;
    }
  }

  return {
    hue: h === undefined ? 0 : Math.round(h * 360),
    saturation: Math.round(s * 100),
    value: Math.round(v * 100),
  } as HSV;
};
