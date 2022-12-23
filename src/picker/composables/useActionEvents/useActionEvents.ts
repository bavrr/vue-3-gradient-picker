import { ref, onBeforeUnmount } from 'vue';
import { ActionEvent } from './types/actionType';
import { Position } from './types/position';
import eventTypeGuard from './helpers/eventTypeGuard';
import getStartPosition from './helpers/getStartPosition';
import preventDefault from './helpers/preventDefault';
import mouseEventsLogic from './mouseEvents';
import touchEventsLogic from './touchEvents';
import eventValue from './helpers/getEventValue';

export default (element: HTMLElement, isPoint = false) => {
  const position = ref({
    startX: 0,
    startY: 0,
    positionX: 0,
    positionY: 0,
  } as Position);

  let touchLogic = {} as ReturnType<typeof touchEventsLogic>;
  let mouseLogic = {} as ReturnType<typeof mouseEventsLogic>;

  const invalidStart = (event: ActionEvent) =>
    !eventTypeGuard(event) && !mouseLogic.isValidStartMouseButton(event);

  const addMoveListeners = (event: ActionEvent) => {
    if (eventTypeGuard(event)) {
      touchLogic.addTouchMoveListeners();
      return;
    }

    mouseLogic.addMouseMoveListeners();
  };

  const startAction = (event: ActionEvent) => {
    preventDefault(event);

    if (invalidStart(event)) {
      return;
    }

    position.value = getStartPosition(element, event, isPoint);

    addMoveListeners(event);
  };

  const changePosition = (event: ActionEvent) => {
    preventDefault(event);

    const eventX = eventValue(event, 'X');
    const eventY = eventValue(event, 'Y');
    const moveX = eventX - position.value.startX;
    const moveY = eventY - position.value.startY;

    position.value = {
      positionX: position.value.positionX + moveX,
      positionY: position.value.positionY + moveY,
      startX: eventX,
      startY: eventY,
    } as Position;
  };

  const stopAction = (event: ActionEvent) => {
    preventDefault(event);

    if (eventTypeGuard(event)) {
      touchLogic.stopTouchListeners();
      return;
    }

    mouseLogic.stopMouseListeners();
  };

  const initiateListeners = () => {
    touchLogic.initiateTouchListeners();
    mouseLogic.initiateMouseListeners();
  };

  const deactivateListeners = () => {
    mouseLogic.deleteMouseListeners();
    touchLogic.deleteTouchListeners();
  };

  onBeforeUnmount(() => {
    deactivateListeners();
  });

  mouseLogic = mouseEventsLogic(
    element,
    startAction,
    stopAction,
    changePosition
  );

  touchLogic = touchEventsLogic(
    element,
    startAction,
    stopAction,
    changePosition
  );

  initiateListeners();

  return {
    position,
  };
};
