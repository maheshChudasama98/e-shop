import { imageUlr } from 'src/constance';

export function lightenColor(hexColor, factor) {
  // Remove '#' if present
  hexColor = hexColor.replace('#', '');

  // Parse the color into RGB components
  const red = parseInt(hexColor.slice(0, 2), 16);
  const green = parseInt(hexColor.slice(2, 4), 16);
  const blue = parseInt(hexColor.slice(4, 6), 16);

  // Calculate the new RGB values by blending towards white
  const newRed = Math.round(red + (255 - red) * factor);
  const newGreen = Math.round(green + (255 - green) * factor);
  const newBlue = Math.round(blue + (255 - blue) * factor);

  // Convert RGB values back to HEX
  const newHexColor = `#${[newRed, newGreen, newBlue]
    .map((val) => val.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

  return newHexColor;
}

export function defaultImageUrl(url) {
  if (imageUlr === undefined || imageUlr === 'undefined') {
    // Use relative paths that work with Vite's base configuration
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    return `${import.meta.env.BASE_URL}${cleanUrl}`;
  }
  return imageUlr + url;
}

export function calculatePercentageChange(c, p) {
  const current = Number(c);
  const previous = Number(p);
  if (!previous || previous === 0) return current ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export const getDisplayData = ({
  list = [],
  value,
  valueKey = 'value',
  labelKey = 'label',
  textColorKey = 'text_color',
  bgColorKey = 'bg_color',
}) => {
  const item = list.find((i) => i[valueKey] === value);

  if (!item) {
    return {
      label: '-',
      textColor: '#000',
      bgColor: '#eee',
    };
  }

  return {
    label: item[labelKey],
    textColor: item[textColorKey] || '#000',
    bgColor: item[bgColorKey] || '#eee',
  };
};
