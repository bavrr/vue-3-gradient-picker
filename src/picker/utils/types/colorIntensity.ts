import { ComputeRange } from './computeRange';

type MaximumAllowedBoundary = 256;

export type ColorIntensity = ComputeRange<MaximumAllowedBoundary>[number];
