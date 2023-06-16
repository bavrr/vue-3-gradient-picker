import { Position, ActionEvent } from '@/picker/types';

import getEventValue from './getEventValue';

export default (element: HTMLElement, event: ActionEvent, isPoint: boolean) => {
  let elementX = 0;
  let elementY = 0;

  const positions = element.getBoundingClientRect();

  if (!isPoint) {
    elementX = positions.x;
    elementY = positions.y;
  } else {
    elementX = positions.width;
    elementY = positions.height;
  }

  const startX = getEventValue(event, 'X');
  const startY = getEventValue(event, 'Y');
  const positionX = startX - elementX;
  const positionY = startY - elementY;

  return {
    startX,
    startY,
    positionX,
    positionY,
  } as Position;
};
