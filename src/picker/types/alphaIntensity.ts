import { ComputeRange } from './computeRange';

type AlphaChanel =
  | '0'
  | `0.0${ComputeRange<10>[number]}`
  | `0.${ComputeRange<999>[number]}`
  | '1';

export type AlphaIntensity<Alpha extends number> =
  `${Alpha}` extends AlphaChanel ? Alpha : never;
