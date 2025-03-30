/**
* Provider component for theme context.
* @memberof Contexts
* @function ThemeProvider
* @param {Object} props - Component properties
* @param {React.ReactNode} props.children - Child components to access the theme context
* @returns {JSX.Element} Theme provider component
* @example
* <ThemeProvider>
* <App />
* </ThemeProvider>
*/

import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../theme/theme';

// Create context
const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

// Custom hook to use the theme context
export const useThemeMode = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check for saved preference in localStorage or use system preference
  const getInitialMode = () => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      return savedMode;
    }
    // Check for system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [mode, setMode] = useState(getInitialMode);
  
  // Generate the theme object
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  // Toggle between light and dark modes with animation
  const toggleColorMode = () => {
    // First add a class to the body to indicate transition is happening
    document.body.classList.add('theme-transitioning');
    
    // Update the theme mode
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      // Save to localStorage
      localStorage.setItem('themeMode', newMode);
      
      // Add a specific class for the sun/moon icon rotation animation
      if (newMode === 'dark') {
        document.body.classList.add('light-to-dark');
      } else {
        document.body.classList.remove('light-to-dark');
      }
      
      return newMode;
    });
    
    // Remove the transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 350); // Slightly longer than the CSS transition duration
  };

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only change if user hasn't explicitly chosen a theme
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Context value
  const contextValue = {
    mode,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};