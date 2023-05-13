import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff8a80',
    },
    secondary: {
      main: '#d8ad52',
    },
    background: {
      default: '#f1f1f1',
      paper: '#e6e6e6',
    },
  },
});