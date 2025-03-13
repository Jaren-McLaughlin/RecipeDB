// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
    },
    secondary: {
      main: '#your-secondary-color',
    },
    // Other color options
  },
  typography: {
    fontFamily: 'your-preferred-font, Arial, sans-serif',
    // Typography variants
  },
});

export default theme;