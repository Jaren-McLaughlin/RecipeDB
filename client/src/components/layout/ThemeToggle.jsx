

/**
 * Toggle button for switching between light and dark themes.
 * @memberof Layout
 * @function ThemeToggle
 * @returns {JSX.Element} Theme toggle component
 * @example
 * <ThemeToggle />
 */

import React from 'react';
import { IconButton, Tooltip, useTheme, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../../contexts/ThemeProvider'; 

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeMode();
  const theme = useTheme();
  
  return (
        <Tooltip 
    title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    placement="bottom"
    disableInteractive
    slotProps={{
        popper: {
        sx: {
            // Immediately show/hide without animation
            '& .MuiTooltip-tooltip': {
            transition: 'none !important'
            }
        }
        }
    }}
    >
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
        {/* Container and icon remain the same */}
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