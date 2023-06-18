import { getHue } from '@/picker/utils';

describe('Test getHue', () => {
  it.each`
    offsetX | width  | result
    ${0}    | ${100} | ${0}
    ${110}  | ${100} | ${360}
    ${-110} | ${100} | ${0}
    ${30}   | ${40}  | ${270}
  `(
    'hue should be $result for ofssetX: $offsetX and width: $width',
    ({ offsetX, width, result }) => {
      expect(getHue(offsetX, width)).toBe(result);
    },
  );
});
