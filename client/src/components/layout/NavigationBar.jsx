/**
 * Main navigation bar for the application.
 * @memberof Layout
 * @function NavigationBar
 * @returns {JSX.Element} Navigation bar component
 * @example
 * <NavigationBar />
 */

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
  Avatar,
  Chip
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/MockAuthContext'; // Import from MockAuthContext directly
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Get auth context - use conditional access to prevent errors if context is undefined
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated || false;
  const user = authContext?.user || null;
  const logout = authContext?.logout || (() => console.log('Logout not available'));
  const login = authContext?.login || (() => console.log('Login not available'));
  const isMockAuth = true; // Hardcode this since we know we're using mock auth
  
  // For user menu dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
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
  
  const handleLogout = () => {
    logout();
    navigate('/signin');
    handleUserMenuClose();
  };
  
  // Quick mock login function for testing
  const handleMockLogin = () => {
    login({ email: 'test@example.com', password: 'password123' });
    navigate('/dash');
  };

  return (
    <AppBar 
      position="static"
      sx={isMockAuth ? {
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 97%, ${theme.palette.warning.main} 100%)`
      } : {}}
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
          
          {/* Add mock indicator */}
          {isMockAuth && (
            <Chip
              size="small"
              label="MOCK"
              color="warning"
              icon={<BugReportIcon />}
              sx={{ ml: 1, height: 24 }}
            />
          )}
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
          {/* Theme toggle remains visible regardless of auth state */}
          <ThemeToggle />
          
          {/* Add mock login button when using mock auth and not authenticated */}
          {isMockAuth && !isAuthenticated && (
            <Button 
              color="warning"
              variant="outlined"
              size="small"
              startIcon={<BugReportIcon />}
              onClick={handleMockLogin}
              sx={{ mr: 1 }}
            >
              Mock Login
            </Button>
          )}
          
          {/* Conditional rendering based on authentication state */}
          {isAuthenticated ? (
            <>
              {/* User profile button/menu when logged in */}
              <IconButton
                onClick={handleUserMenuOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
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
                open={open}
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
                
                {/* Add mock user switch options */}
                {isMockAuth && (
                  <MenuItem 
                    onClick={() => {
                      if (user?.isAdmin) {
                        login({ email: 'regular@example.com' });
                      } else {
                        login({ email: 'admin@example.com' });
                      }
                      handleUserMenuClose();
                    }}
                  >
                    Switch to {user?.isAdmin ? 'Regular User' : 'Admin User'}
                  </MenuItem>
                )}
                
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