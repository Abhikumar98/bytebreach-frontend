import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      main: '#4F46E5',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#070526',
    },
  },
  spacing: 4,
  typography: {
    fontFamily: 'DM Sans',
  },
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
