import { ColorPoint } from '@/picker/classes';

const isNotNaN = (colorValue: number) =>
  Number.isNaN(colorValue) ? 0 : colorValue;

export default function <T extends number = 1>(
  colorPoint: ColorPoint<T> | null,
): string {
  if (colorPoint === null) {
    return '00000000';
  }

  const red = isNotNaN(colorPoint.red);
  const green = isNotNaN(colorPoint.green);
  const blue = isNotNaN(colorPoint.blue);
  const alpha = Math.floor(isNotNaN(colorPoint.alpha) * 255);

  let r16 = red.toString(16);
  let g16 = green.toString(16);
  let b16 = blue.toString(16);
  let a16 = alpha.toString(16);

  if (red < 16) r16 = `0${r16}`;
  if (green < 16) g16 = `0${g16}`;
  if (blue < 16) b16 = `0${b16}`;
  if (alpha < 16) a16 = `0${a16}`;

  return r16 + g16 + b16 + a16;
}
