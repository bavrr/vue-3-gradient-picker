import { ActionEvent } from '../types/actionType';

export default (event: ActionEvent): event is TouchEvent => 'touches' in event;
