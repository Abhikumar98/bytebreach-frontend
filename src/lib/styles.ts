import { createTheme, PaletteOptions, Shadows } from '@mui/material';

const palette: PaletteOptions = {
  primary: {
    main: '#4F46E5',
  },
  secondary: {
    main: '#ffffff',
    contrastText: '#070526',
  },
  text: {
    primary: '#070526',
    secondary: '#444444',
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
  shadows: customisedShadow,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '1rem 5rem',
          fontSize: '16px',
          textTransform: 'none',
        },
      },
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
