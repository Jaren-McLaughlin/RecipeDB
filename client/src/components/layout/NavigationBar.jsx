import React, { useState, useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Button,
  useMediaQuery,
  useTheme,
  alpha
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BugReportIcon from '@mui/icons-material/BugReport';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThemeToggle from './ThemeToggle';
import SearchBox from './SearchBox';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import MobileDrawer from './MobileDrawer';
import MockIndicator from './MockIndicator';
import { AuthContext } from '../../contexts/MockAuthContext';

const NavigationBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Auth context
  const { isAuthenticated, user, login, logout, isMockAuth = true } = useContext(AuthContext) || {};
  
  // State
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Event handlers
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };
  
  const handleMockLogin = () => {
    login?.({ email: 'test@example.com', password: 'password123' });
    navigate('/dash');
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: alpha(theme.palette.background.default, 0.95),
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ height: 64 }}>
          {/* Left side: Menu (mobile only) and Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 'bold',
                color: '#2ecc71',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Recipe Suite
            </Typography>
            
            <MockIndicator isMockAuth={isMockAuth} />
            
            {/* Mock Login Button (Only show if not authenticated and isMockAuth is true) */}
            {isMockAuth && !isAuthenticated && !isMobile && (
              <Button 
                color="warning"
                variant="outlined"
                size="small"
                startIcon={<BugReportIcon />}
                onClick={handleMockLogin}
                sx={{ ml: 2 }}
              >
                Mock Login
              </Button>
            )}
          </Box>
          
          {/* Center: Nav links (desktop only) */}
          {!isMobile && (
            <Box sx={{ ml: 4, flexGrow: 1 }}>
              <NavLinks isAuthenticated={isAuthenticated} />
            </Box>
          )}
          
          {/* Right side: Search, Auth Buttons, Theme Toggle, User Menu */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            alignItems: 'center',
            ml: 'auto'
          }}>
            {!isMobile && 
              <SearchBox 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
                isMobile={false}
              />
            }
            
            <ThemeToggle />
            
            {isAuthenticated ? (
              <UserMenu 
                user={user} 
                logout={logout} 
                login={login}
                isMockAuth={isMockAuth}
              />
            ) : (
              // Only show these buttons when not authenticated and not in mock mode
              !isMobile && !isMockAuth && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LoginIcon />}
                    onClick={() => navigate('/signin')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate('/signup')}
                    sx={{ 
                      bgcolor: '#2ecc71', 
                      '&:hover': { bgcolor: '#27ae60' } 
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile drawer */}
      <MobileDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        login={login}
        logout={logout}
        isMockAuth={isMockAuth}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default NavigationBar;