import { ActionEvent } from '../types/actionType';
import eventTypeGuard from './eventTypeGuard';

export default (event: ActionEvent, type: 'X' | 'Y') => {
  const isTouchEvent = eventTypeGuard(event);

  if (isTouchEvent) {
    return type === 'X' ? event.touches[0].clientX : event.touches[0].clientY;
  }

  return type === 'X' ? event.clientX : event.clientY;
};

// import { ActionEvent } from '../types/actionType';
// import { PositionX, PositionY } from '../types/position';
// import eventTypeGuard from './eventTypeGuard';

// type PositionType = 'X' | 'Y';
// type PositionVector<T extends PositionType> = T extends 'X'
//   ? PositionX
//   : T extends 'Y'
//   ? PositionY
//   : never;

// export default <Type extends PositionType>(
//   event: ActionEvent,
//   type: Type
// ): PositionVector<Type> => {
//   const isTouchEvent = eventTypeGuard(event);

//   if (isTouchEvent) {
//     return (
//       type === 'X' ? event.touches[0].pageX : event.touches[0].pageY
//     ) as PositionVector<Type>;
//   }

//   return (type === 'X' ? event.pageX : event.pageY) as PositionVector<Type>;
// };
