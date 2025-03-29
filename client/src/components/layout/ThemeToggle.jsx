import React from 'react';
import { IconButton, Tooltip, useTheme, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../../contexts/ThemeProvider'; 

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeMode();
  const theme = useTheme();
  
  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        aria-label="toggle theme"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: 40,
          height: 40,
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {/* Use a container for smooth icon transition */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Sun/Moon icon with special animation class */}
          {mode === 'light' ? (
            <DarkModeIcon className="theme-toggle-icon" />
          ) : (
            <LightModeIcon className="theme-toggle-icon light-to-dark" />
          )}
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;