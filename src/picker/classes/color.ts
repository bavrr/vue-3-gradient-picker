import ColorPoint from './colorPoint';

export default class Color {
  point: ColorPoint;
  style: string;

  constructor(point: ColorPoint, style = '') {
    this.point = point;
    this.style = style;
  }
}
