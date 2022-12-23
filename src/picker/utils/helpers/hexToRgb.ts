const hexRegexp =
  /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i;

const regexp = /([0-9A-F])([0-9A-F])([0-9A-F])/i;

export default (value: string) => {
  let stringColor = value;

  const valid = hexRegexp.test(stringColor);

  if (!valid) {
    return null;
  }

  if (stringColor[0] === '#') {
    stringColor = stringColor.slice(1, value.length);
  }

  if (stringColor.length === 3) {
    stringColor = stringColor.replace(regexp, '$1$1$2$2$3$3');
  }

  const red = parseInt(stringColor.substring(0, 2), 16);
  const green = parseInt(stringColor.substring(2, 4), 16);
  const blue = parseInt(stringColor.substring(4, 6), 16);
  const alpha = parseInt(stringColor.substring(6, 8), 16) / 255;

  return {
    red,
    green,
    blue,
    alpha,
  };
};
