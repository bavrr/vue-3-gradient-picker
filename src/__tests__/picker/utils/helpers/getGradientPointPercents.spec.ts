import { getGradientPointPercent } from '@/picker/utils';

describe('Test getGradientPointPercent', () => {
  it.each`
    offsetX | width  | result
    ${-20}  | ${100} | ${0}
    ${20}   | ${100} | ${20}
    ${110}  | ${100} | ${100}
  `(
    'left percent should be $result for offsetX: $offsetX and width: $width',
    ({ offsetX, width, result }) => {
      expect(getGradientPointPercent(offsetX, width)).toBe(result);
    },
  );
});
