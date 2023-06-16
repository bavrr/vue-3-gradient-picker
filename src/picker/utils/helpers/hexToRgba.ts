const hexRegexp =
  /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i;

export default (value: string) => {
  let stringColor = value;

  const valid = hexRegexp.test(stringColor);

  if (!valid) {
    return null;
  }

  if (stringColor[0] === '#') {
    stringColor = stringColor.slice(1, value.length);
  }

  const red = parseInt(stringColor.substring(0, 2), 16);
  const green = parseInt(stringColor.substring(2, 4), 16);
  const blue = parseInt(stringColor.substring(4, 6), 16);

  console.log(parseInt(stringColor.substring(6, 8), 16));

  const alpha = Number(
    (parseInt(stringColor.substring(6, 8), 16) / 255).toFixed(2),
  );

  return {
    red,
    green,
    blue,
    alpha: isNaN(alpha) ? 1 : alpha,
  };
};
