import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

export const grey = {
  0: '#FFFFFF',
  10: '#FaFaFa',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  1000: '#000000',
};

// export const primary = {
//   lighter: '#D0ECFE',
//   light: '#73BAFB',
//   main: '#1877F2',
//   dark: '#0C44AE',
//   darker: '#042174',
//   contrastText: '#FFFFFF',
// };

export const primary = {
  lighter: '#C8FAD0',
  light: '#D8FFF2',
  main: '#3AD29F',
  dark: '#3AD29F',
  darker: '#3AD29F',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#EFD6FF',
  light: '#C684FF',
  main: '#8E33FF',
  dark: '#5119B7',
  darker: '#27097A',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};
export const success = {
  lighter: '#C8FAD6',
  light: '#5BE49B',
  main: '#00A76F',
  dark: '#007867',
  darker: '#004B50',
  contrastText: '#FFFFFF',
};

export const darker = {
  lighter: '#F4F6F8',
  light: '#C4CDD5',
  main: '#919EAB',
  dark: '#637381',
  darker: '#212B36',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: grey[800],
};

export const error = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

export const CancelButton = {
  main: grey[700],
};

export const common = {
  main: '#000000',
  black: '#000000',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  darker,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
  CancelButton,
};

const nav = {
  navColor: success?.light,
  navActiveColor: success?.light,
  navHoverColor: success?.light,
  navBgcolor: success?.light,
  navActiveBgcolor: success?.light,
  navHoverBgcolor: success?.light,
};

// ----------------------------------------------------------------------

export function palette() {
  return {
    ...base,
    ...nav,
    mode: 'light',
    text: {
      success: primary?.main,
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
      light: grey[0],
      dark: grey[1000],
    },
    background: {
      paper: '#FFFFFF',
      default: '#F3F3F3',
      // default: '#F3FFFB',
      neutral: grey[200],
      light: grey[0],
      dark: grey[1000],
    },
    muiFormField: {
      background: grey[200], // form field back ground color,

      // label text color
      color: grey[1000],
      colorFocused: grey[1000],
      colorError: grey[1000],

      // border
      border: grey[0],
      borderHover: grey[0],
      borderFocused: grey[0],
      borderError: grey[0],
      borderErrorFocused: grey[0],
    },
    action: {
      ...base.action,
      active: grey[600],
    },
  };
}
