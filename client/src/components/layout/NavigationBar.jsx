/**
 * Main navigation bar for the application.
 * @memberof Layout
 * @function NavigationBar
 * @returns {JSX.Element} Navigation bar component
 * @example
 * <NavigationBar />
 */
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Avatar
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Get auth context using the custom hook
  const { isAuthenticated, user, logout } = useAuth();
  
  // For user menu dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateProfile = () => {
    navigate('/profile');
    handleUserMenuClose();
  };

  const handleNavigateHome = () => {
    navigate('/dash');
  };

  const handleNavigateAddRecipe = () => {
    navigate('/add');
  };

  const handleNavigateLogin = () => {
    navigate('/signin');
  };

  const handleNavigateSignUp = () => {
    navigate('/signup');
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/signin');
    handleUserMenuClose();
  };

  return (
    <AppBar 
      position="static"
      sx={{
        background: theme.palette.primary.main
      }}
    >
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        padding: theme.spacing(0, 2)
      }}>
        {/* Left section: App branding - always visible */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <RestaurantIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Recipe Suite
          </Typography>
        </Box>
        
        {/* Center/Main section: Navigation links */}
        <Box sx={{ 
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'center',
          flexGrow: 1,
          mx: 2
        }}>
          {/* Show different navigation options based on authentication status */}
          {isAuthenticated ? (
            <>
              <Button color="inherit" sx={{ mx: 1 }} onClick={handleNavigateHome}>My Recipes</Button>
              <Button color="inherit" sx={{ mx: 1 }} onClick={handleNavigateAddRecipe}>Add Recipe</Button>
            </>
          ) : (
            <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate('/')}>Home</Button>
          )}
        </Box>
        
        {/* Right section: Auth buttons or user menu, and theme toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeToggle />
          
          {/* Conditional rendering based on authentication state */}
          {isAuthenticated ? (
            <>
              {/* User profile button/menu when logged in */}
              <IconButton
                onClick={handleUserMenuOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={menuOpen ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                color="inherit"
              >
                {user?.profileImage ? (
                  <Avatar 
                    src={user.profileImage} 
                    alt={user.userName || 'User'} 
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleUserMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'user-menu-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleNavigateProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Login/Register buttons when logged out */}
              <Button color="inherit" onClick={handleNavigateLogin}>Sign In</Button>
              <Button 
                color="inherit"
                variant="outlined" 
                sx={{ 
                  ml: 1,
                  border: '1px solid white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                onClick={handleNavigateSignUp}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;