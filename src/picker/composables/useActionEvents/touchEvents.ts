import { ActionEvent } from '@/picker/types';

export default (
  element: HTMLElement,
  startAction: (event: ActionEvent) => void,
  stopAction: (event: ActionEvent) => void,
  changePosition: (event: ActionEvent) => void,
) => ({
  initiateTouchListeners() {
    element.addEventListener('touchstart', startAction, {
      passive: false,
    });

    element.addEventListener('touchend', stopAction, {
      passive: false,
    });
  },
  addTouchMoveListeners() {
    element.addEventListener('touchmove', changePosition, {
      passive: false,
    });
  },
  stopTouchListeners() {
    element.removeEventListener('touchmove', changePosition);
  },
  deleteTouchListeners() {
    element.removeEventListener('touchstart', startAction);
    element.removeEventListener('touchend', stopAction);
  },
});
