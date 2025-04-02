import { createTheme } from '@mui/material/styles';

// Common theme settings (shared between light and dark)
const getDesignTokens = (mode) => ({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.2 },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.2 },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.2 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.2 },
    subtitle1: { fontSize: '1rem', fontWeight: 500 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  
  // Apply color palette based on mode
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#e74c3c',
            light: '#ff7e6b',
            dark: '#b01e13',
            contrastText: '#fff',
          },
          secondary: {
            main: '#2ecc71',
            light: '#6effa0',
            dark: '#009a44',
            contrastText: '#fff',
          },
          background: {
            default: '#f9f9f9',
            paper: '#ffffff',
          },
          text: {
            primary: '#2c3e50',
            secondary: '#7f8c8d',
          },
          divider: 'rgba(0, 0, 0, 0.08)',
        }
      : {
          // Dark mode palette
          primary: {
            main: '#ff6b6b',
            light: '#ff9d9d',
            dark: '#c73e3e',
            contrastText: '#fff',
          },
          secondary: {
            main: '#2ecc71',
            light: '#6effa0',
            dark: '#009a44',
            contrastText: '#fff',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#f5f5f5',
            secondary: '#b0b0b0',
          },
          divider: 'rgba(255, 255, 255, 0.08)',
        }),
  },
});

// Component overrides based on mode
const getThemedComponents = (mode) => ({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' 
            ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
            : '0px 2px 4px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 16px',
          boxShadow: mode === 'light'
            ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
            : '0px 2px 4px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
              : '0px 4px 8px rgba(0, 0, 0, 0.3)',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 4px 12px rgba(0, 0, 0, 0.05)'
            : '0px 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0px 12px 20px rgba(0, 0, 0, 0.1)'
              : '0px 12px 20px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
  },
});

// Theme creation function
export const createAppTheme = (mode) => {
  return createTheme({
    ...getDesignTokens(mode),
    ...getThemedComponents(mode),
  });
};

// Export default theme (light mode)
const theme = createAppTheme('light');
export default theme;