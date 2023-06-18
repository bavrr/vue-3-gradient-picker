import { getAlpha } from '@/picker/utils';

describe('Test getAlpha', () => {
  it.each`
    positionX | width   | result
    ${1000}   | ${0}    | ${1}
    ${1000}   | ${1}    | ${1}
    ${-1}     | ${2}    | ${0}
    ${500}    | ${1000} | ${0.5}
  `(
    'alpha should be $result for positionX $positionX and width $width',
    ({ positionX, width, result }) => {
      expect(getAlpha(positionX, width)).toBeCloseTo(result);
    },
  );
});
