import { createTheme, PaletteOptions, Shadows } from '@mui/material';

const palette: PaletteOptions = {
  primary: {
    main: '#4F46E5',
  },
  secondary: {
    dark: '#312E81',
    light: '#CFD4FF66',
    main: '#818CF8',
    contrastText: '#070526',
  },
  text: {
    primary: '#070526',
    secondary: '#444444',
  },
  background: {
    paper: '#f6f6f6',
    default: '#ffffff',
  },
};

const baseTheme = createTheme();

const customisedShadow: Shadows = [...baseTheme.shadows];

customisedShadow[1] = '0px 2px 6px 0px rgba(19, 18, 66, 0.07)';
customisedShadow[2] = '0px 5px 18px 0px rgba(160, 160, 160, 0.25)';

export default createTheme({
  palette: {
    ...palette,
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
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            background: palette.background?.default,
          },
        },
      ],
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
            color: palette.text?.secondary,
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
