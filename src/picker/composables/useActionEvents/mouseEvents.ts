import { ActionEvent } from '@/picker/types';

export default (
  element: HTMLElement,
  startAction: (event: ActionEvent) => void,
  stopAction: (event: ActionEvent) => void,
  changePosition: (event: ActionEvent) => void,
) => ({
  initiateMouseListeners() {
    element.addEventListener('mousedown', startAction);
    window.addEventListener('mouseup', stopAction);
  },
  addMouseMoveListeners() {
    window.addEventListener('mousemove', changePosition);
  },
  stopMouseListeners() {
    window.removeEventListener('mousemove', changePosition);
  },
  deleteMouseListeners() {
    element.removeEventListener('mousedown', startAction);
    window.removeEventListener('mouseup', stopAction);
  },
  isValidStartMouseButton(event: MouseEvent) {
    if (event.button !== 0) {
      return false;
    }
    return true;
  },
});
