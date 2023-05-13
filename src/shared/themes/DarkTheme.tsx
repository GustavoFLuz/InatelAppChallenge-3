import { createTheme } from '@mui/material/styles';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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