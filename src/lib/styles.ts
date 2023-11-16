import { createTheme, PaletteOptions, Shadows } from '@mui/material';

const lightPalette: PaletteOptions = {
  contrastThreshold: 1,
  primary: {
    light: '#0644FF',
    main: '#0037DC',
    dark: '#2C22DF',
  },
  secondary: {
    light: '#82A2FF',
    main: '#ffffff',
    dark: '#f6f6f6',

    50: '#82A2FF1A',
    100: '#82A2FF66',
    700: '#2F63FF',
    800: '#002BAC',

    contrastText: '#110D5E',
  },
  text: {
    primary: '#110D5E',
    secondary: '#444444',
  },
  background: {
    paper: '#f6f6f6',
    default: '#ffffff',
  },
};

const darkPalette: PaletteOptions = {
  contrastThreshold: 1,
  primary: {
    light: '#0644FF',
    main: '#0037DC',
    dark: '#2C22DF',
  },
  secondary: {
    light: '#82A2FF66',
    main: '#ffffff',
    dark: '#f6f6f6',

    100: '#82A2FF66',
    700: '#2F63FF',
    800: '#002BAC',

    contrastText: '#110D5E',
  },
  text: {
    primary: '#9BA3F4',
    secondary: '#FFFFFF99',
  },
  background: {
    paper: '#1A1A1A',
    default: '#141414',
  },
};

const baseTheme = createTheme();

const customisedShadow: Shadows = [...baseTheme.shadows];

customisedShadow[1] = '0px 2px 6px 0px rgba(19, 18, 66, 0.07)';
customisedShadow[2] = '0px 5px 18px 0px rgba(160, 160, 160, 0.25)';

const createCustomTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
    spacing: 4,
    typography: {
      fontFamily: 'DM Sans',
    },
    shape: {
      borderRadius: 4,
    },
    shadows: customisedShadow,
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            padding: '0 1rem',
            borderRadius: '15rem !important',
            boxShadow: customisedShadow[1],
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '16px',
            textTransform: 'none',
            borderRadius: '15rem',
          },
          sizeLarge: {
            padding: '1rem 5rem',
          },
          sizeMedium: {
            padding: '0.5rem 1.5rem',
          },
        },
        variants: [],
      },
      MuiInput: {
        styleOverrides: {
          root: {
            background: 'white',
          },
        },
      },
      MuiTypography: {
        variants: [
          {
            props: {
              variant: 'subtitle1',
            },
            style: {
              color: lightPalette.text?.secondary,
            },
          },
        ],
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: '15rem',
          },
        },
      },

      MuiCircularProgress: {
        styleOverrides: {
          root: {
            display: 'inline-table',
          },
        },
      },

      // MuiTextField: {
      //   variants: [
      //     {
      //       props: { variant: 'filled', color: 'secondary' },
      //       style: {
      //         background: '#ffffff',
      //       },
      //     },
      //   ],
      // },
    },
  });

export default createCustomTheme;
