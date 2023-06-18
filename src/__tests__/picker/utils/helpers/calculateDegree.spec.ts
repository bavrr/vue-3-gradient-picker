import { calculateDegree } from '@/picker/utils';

describe('Test Calculate Degree', () => {
  it.each`
    positionX | positionY | centerX | centerY | result
    ${300}    | ${500}    | ${0}    | ${0}    | ${149}
    ${500}    | ${300}    | ${0}    | ${0}    | ${121}
    ${0}      | ${300}    | ${0}    | ${0}    | ${180}
    ${300}    | ${500}    | ${400}  | ${400}  | ${225}
    ${-400}   | ${-800}   | ${100}  | ${100}  | ${331}
  `(
    'degree should be $result for position x:$positionX, y:$positionY with center x: $centerX, y: $centerY',
    ({ positionX, positionY, centerX, centerY, result }) => {
      expect(
        calculateDegree({ positionX, positionY, centerX, centerY }),
      ).toBeCloseTo(result);
    },
  );
});
