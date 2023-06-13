import { InjectionKey } from 'vue';
import { Left } from '../types';

const DeletePointKey: InjectionKey<(pointIndex: number) => void> =
  Symbol('DeletePointKey');

const SetActivePointKey: InjectionKey<(pointIndex: number) => void> =
  Symbol('SetActivePointKey');

const AddPointKey: InjectionKey<(position: Left) => void> =
  Symbol('AddPointKey');

export { DeletePointKey, SetActivePointKey, AddPointKey };

