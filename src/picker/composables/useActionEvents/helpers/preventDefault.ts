import { ActionEvent } from '@/picker/types';

export default (event: ActionEvent) => {
  if (event.cancelable) {
    event.preventDefault();
    event.stopPropagation();
  }
};
