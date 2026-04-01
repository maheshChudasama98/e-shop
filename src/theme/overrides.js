import { alpha } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { shadows } from './shadows';

// ----------------------------------------------------------------------

export function overrides(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 12,
          borderRadius: 5,
          // boxShadow: 'none',
          fontWeight: 500,
          padding: '5px 15px',
        },
        sizeLarge: {
          // minHeight: 48,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase': {
            '&:hover': {
              backgroundColor: theme.palette.action.hover, // Hover background color
            },
            '&.Mui-checked': {
              color: theme.palette.primary.main, // Checked thumb color
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main, // Checked track color
              },
            },
            '&.Mui-error': {
              color: theme.palette.error.main, // Error thumb color
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.error.main, // Error track color
              },
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: theme.palette.grey[500], // Default track color
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: 12,
            borderRadius: 5,
            backgroundColor: theme.palette.grey[200],
            minHeight: 36,
            border: 'none',
            '& .MuiOutlinedInput-input': {
              padding: '10px 10px',
              height: 'auto',
              border: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none', // <-- Remove double border here
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              // border: `1px solid ${theme.palette.error.main}`,
              border: 'none',
            },
            '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
              // border: `1px solid ${theme.palette.error.main}`,
              border: 'none',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'static',
          transform: 'none',
          marginBottom: 1,
          fontSize: 12,
          fontWeight: 100,
          color: theme.palette.grey[600],
          '&.Mui-focused': {
            // color: theme.palette.grey[1000],
            color: theme.palette.grey[600],
          },
          '&.Mui-error': {
            // color: theme.palette.grey[600],
            color: theme.palette.error.main,
          },
          '&.Mui-error.Mui-focused': {
            color: theme.palette.grey[600],
            // color: theme.palette.error.main,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 10,
          fontWeight: 600,
          boxShadow: 'none',
          borderRadius: Number(theme.shape.borderRadius) * 0.3,
          height: 'auto',
        },
        label: {
          padding: '3px 6px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: theme.customShadows.card,
          boxShadow: shadows()[3],
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
          position: 'relative',
          zIndex: 0,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.24),
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500],
          '&.Mui-checked': {
            color: theme.palette.primary.main,
          },
          '&:hover': {
            // backgroundColor: theme.palette.grey[300], // hover background
          },
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            borderRadius: '80%',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          marginBottom: theme.spacing(0),
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: 12,
            borderRadius: 5,
            backgroundColor: theme.palette.grey[200],
            minHeight: 36, // Optional: control overall height of root
            padding: 0,
            margin: 0,
            '& .MuiAutocomplete-input': {
              padding: '10px 12px !important',
            },
            '& fieldset': {
              borderColor: theme.palette.grey[200],
            },
            '&:hover fieldset': {
              borderColor: theme.palette.grey[200],
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.grey[200],
            },
            '&.Mui-error fieldset': {
              // borderColor: theme.palette.error.main,
            },
            '&.Mui-error.Mui-focused fieldset': {
              // borderColor: theme.palette.error.main,
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          overflow: 'visible',
          '& .MuiTabs-indicator': {
            display: 'none', // ✅ hide underline
          },
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          position: 'relative',
          border: `1px solid ${theme.palette.primary.lighter}`,
          borderRadius: Number(theme.shape.borderRadius) * 0.6,
          minWidth: 0,
          marginRight: 6,
          padding: '1px 10px',
          fontWeight: 100,
          fontSize: 12,
          minHeight: 30,
          overflow: 'visible',
          color: theme.palette.text.dark,

          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
          },

          '&.Mui-selected': {
            color: theme.palette.text.light,
            fontWeight: 700,
            backgroundColor: '#515151',
            border: 'none',

            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #515151', // arrow color
            },
          },

          '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  };
}
