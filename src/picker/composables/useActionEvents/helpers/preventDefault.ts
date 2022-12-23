import { ActionEvent } from '../types/actionType';

export default (event: ActionEvent) => {
  if (event.cancelable) {
    event.preventDefault();
    event.stopPropagation();
  }
};
