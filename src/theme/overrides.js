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
          borderRadius: 8,
          fontWeight: 600,
          padding: '6px 15px',
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
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 10,
          fontWeight: 600,
          borderRadius: Number(theme.shape.borderRadius) * 0.8,
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
          borderRadius: Number(theme.shape.borderRadius) * 1.8,
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
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            borderRadius: '50%', 
          },
          '&.Mui-checked .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
            borderRadius: '50%',
          },
          '&:hover .MuiSvgIcon-root': {
            borderRadius: '50%',
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'static',
          transform: 'none',
          marginBottom: 1.5,
          marginLeft: 3,
          fontSize: 11.5,
          fontWeight: 500,
          color: theme.palette.muiFormField.color,
          '&.Mui-focused': {
            color: theme.palette.muiFormField.colorFocused,
          },
          '&.Mui-error': {
            color: theme.palette.muiFormField.colorError,
          },
          '&.Mui-error.Mui-focused': {
            color: theme.palette.muiFormField.colorError,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginLeft: 3,
          fontSize: 11.5,
          fontWeight: 500,
          '&.MuiFormLabel-root': {
            position: 'static',
            transform: 'none',
            marginBottom: 1.5,
            fontSize: 11.5,
            fontWeight: 500,
            color: theme.palette.muiFormField.color,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: 14,
            borderRadius: 10,
            backgroundColor: theme.palette.muiFormField.background,
            minHeight: 36,
            border: 'none',
            '& .MuiInputLabel-asterisk': {
              color: 'red',
              fontSize: 14,
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 12px',
              height: 'auto',
              border: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.muiFormField.border}`,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.muiFormField.borderHover}`,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.muiFormField.borderFocused}`,
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.muiFormField.borderError}`,
            },
            '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.muiFormField.borderErrorFocused}`,
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: 14,
            borderRadius: 7,
            backgroundColor: theme.palette.muiFormField.background,
            minHeight: 36,
            border: 'none',
            padding: 0,
            margin: 0,
            '& .MuiAutocomplete-input': {
              padding: '10px 12px',
              height: 'auto',
              border: 'none',
            },
            '& fieldset': {
              border: `1px solid ${theme.palette.muiFormField.border}`,
            },
            '&:hover fieldset': {
              border: `1px solid ${theme.palette.muiFormField.borderHover}`,
            },
            '&.Mui-focused fieldset': {
              border: `1px solid ${theme.palette.muiFormField.borderFocused}`,
            },
            '&.Mui-error fieldset': {
              border: `1px solid ${theme.palette.muiFormField.borderError}`,
            },
            '&.Mui-error.Mui-focused fieldset': {
              border: `1px solid ${theme.palette.muiFormField.borderErrorFocused}`,
            },
          },
        },
      },
    },
    // MuiPopper: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiAutocomplete-paper': {
    //         background: `linear-gradient(225deg, #e7f8fb, #ffffff, #ffffff, #feefeb)`,
    //         backdropFilter: 'blur(30px)',
    //         padding:5,
    //         margin:0
    //       },
    //       '& .MuiAutocomplete-listbox': {
    //         padding: 0,
    //       },
    //       '& .MuiAutocomplete-option': {
    //         // padding: 0,
    //         borderRadius: 8,
    //         fontSize: 14,
    //         fontWeight: 500,
    //       },
    //     },
    //   },
    // },

    MuiPopper: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-paper': {
            background: `linear-gradient(225deg, #e7f8fb, #ffffff, #ffffff, #feefeb)`,
            backdropFilter: 'blur(30px)',
            padding: '5px 5px 0px 5px',
            margin: 0,
            borderRadius: 10,
          },
          '& .MuiAutocomplete-listbox': {
            padding: 0,
          },
          '& .MuiAutocomplete-option': {
            borderRadius: 7,
            fontSize: 14,
            fontWeight: 500,
            transition: 'all 0.2s ease',
            padding: '8px 12px',
            marginBottom: 5,
            // ✅ Hover
            '&:hover': {
              backgroundColor: alpha(theme.palette.darker.main, 0.1), // light blue
            },

            // ✅ Focus (keyboard navigation)
            '&.Mui-focused': {
              backgroundColor: alpha(theme.palette.darker.main, 0.1), // light blue
            },
            // ✅ Selected
            '&[aria-selected="true"]': {
              backgroundColor: alpha(theme.palette.darker.main, 0.2), // light blue
            },

            // // ✅ Selected + Hover
            '&[aria-selected="true"]:hover': {
              backgroundColor: alpha(theme.palette.darker.main, 0.1), // light blue
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: `linear-gradient(225deg, #e7f8fb, #ffffff, #ffffff, #feefeb)`,
          backdropFilter: 'blur(30px)',
        },
      },
    },
  };
}
