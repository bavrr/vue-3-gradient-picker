import { ActionEvent } from '@/picker/types';

export default (event: ActionEvent): event is TouchEvent => 'touches' in event;
