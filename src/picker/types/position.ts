import { BrandType } from '@/picker/types/brand';

export type PositionX = BrandType<number, 'positionX'>;

export type PositionY = BrandType<number, 'positionY'>;

export type Position = {
  startX: number;
  startY: number;
  positionX: PositionX;
  positionY: PositionY;
};
