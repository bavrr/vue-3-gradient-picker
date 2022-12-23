import { Degree, GradientType } from '../types';
import { ColorPoint, GradientColorPoint } from '../../classes';

export const generateSolidStyle = (colorPoint: ColorPoint): string =>
  `rgba(${colorPoint.red}, ${colorPoint.green}, ${colorPoint.blue}, ${colorPoint.alpha})`;

export const generateGradientStyle = (
  points: GradientColorPoint[],
  type: GradientType,
  degree: Degree
): string => {
  let style = '';
  const sortedPoints = points.slice();

  sortedPoints.sort((a, b) => a.left - b.left);

  if (type === 'linear') {
    style = `linear-gradient(${degree}deg,`;
  } else {
    style = 'radial-gradient(';
  }

  sortedPoints.forEach((point, index) => {
    style += `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha}) ${point.left}%`;

    if (index !== sortedPoints.length - 1) {
      style += ',';
    }
  });

  style += ')';

  return style;
};
