import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#bed733',
    },
    secondary: {
      main: '#009de0',
    },
    background: {
      default: '#dfdfdf',
      paper: '#ffffff',
    },
  },
});