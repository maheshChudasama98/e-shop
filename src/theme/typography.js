// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    '@media (min-width:100px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const mainFont = 'Poppins, sans-serif';
export const primaryFont = 'Public Sans, sans-serif';
export const secondaryFont = 'Barlow, sans-serif';

// ----------------------------------------------------------------------

export const typography = {
  fontFamily: mainFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body12: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(12),
  },
  body20: {
    lineHeight: 1.5,
    fontSize: pxToRem(20),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },

  mainHeader: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    display: 'block',
    fontFamily: mainFont,
    ...responsiveFontSizes({ xs: 36, sm: 36, md: 36, lg: 36 }),
  },
  header: {
    fontWeight: 700,
    lineHeight: 1.5,
    display: 'block',
    fontFamily: mainFont,
    ...responsiveFontSizes({ xs: 26, sm: 26, md: 26, lg: 24 }),
  },
  subHeder: {
    lineHeight: 1.5,
    fontFamily: mainFont,
    ...responsiveFontSizes({ xs: 18, sm: 18, md: 18, lg: 18 }),
  },
  bold: { 
    fontWeight: 700,
    lineHeight: 1.5,
    display: 'block',
    fontFamily: mainFont,
    ...responsiveFontSizes({ xs: 16, sm: 16, md: 17, lg: 17 }),
  },
  normal: {
    fontWeight: 600,
    display: 'block',
    fontFamily: mainFont,
    lineHeight: 22 / 14,
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 14, lg: 14 }),
  },
  tableHead: {
    fontWeight: 600,
    display: 'block',
    fontFamily: mainFont,
    lineHeight: 22 / 14,
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 14, lg: 14 }),
  },
  light: {
    fontWeight: 200,
    display: 'block',
    fontFamily: mainFont,
    lineHeight: 22 / 14,
    ...responsiveFontSizes({ xs: 13, sm: 13, md: 14, lg: 14 }),
  },
  big: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: mainFont,
    // display: 'block',
    ...responsiveFontSizes({ xs: 18, sm: 18, md: 18, lg: 18 }),
  },
  small: {
    fontFamily: mainFont,
    lineHeight: 22 / 14,
    ...responsiveFontSizes({ xs: 10, sm: 10, md: 10, lg: 14 }),
  },
  registerTest: {
    lineHeight: 22 / 14,
    display: 'flex',
    color: 'text.secondary',
    fontFamily: mainFont,
    ...responsiveFontSizes({ xs: 10, sm: 10, md: 10, lg: 12 }),
  },
};
