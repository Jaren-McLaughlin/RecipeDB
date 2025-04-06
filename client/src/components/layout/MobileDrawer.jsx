import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NavLinks from './NavLinks';
import SearchBox from './SearchBox';
import MockIndicator from './MockIndicator';

const MobileDrawer = ({ 
  open, 
  onClose, 
  isAuthenticated, 
  user, 
  login, 
  logout, 
  isMockAuth,
  searchValue,
  setSearchValue,
  handleSearch 
}) => {
  const navigate = useNavigate();
  
  const handleMockLogin = () => {
    login({ email: 'test@example.com', password: 'password123' });
    onClose();
    navigate('/dash');
  };
  
  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };
  
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 280, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
            Recipe Suite
          </Typography>
          <MockIndicator isMockAuth={isMockAuth} />
        </Box>
        
        <SearchBox 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          isMobile={true}
        />
        
        <Box sx={{ mt: 2 }}>
          <NavLinks 
            isAuthenticated={isAuthenticated} 
            vertical={true} 
            onClick={onClose} 
          />
        </Box>
        
        {!isAuthenticated && (
          <Button
            fullWidth
            variant="contained"
            sx={{ 
              mt: 2, 
              bgcolor: isMockAuth ? (theme) => theme.palette.warning.main : '#2ecc71',
              '&:hover': { 
                bgcolor: isMockAuth ? 
                  (theme) => theme.palette.warning.dark : 
                  '#27ae60' 
              } 
            }}
            startIcon={isMockAuth ? <BugReportIcon /> : null}
            onClick={isMockAuth ? handleMockLogin : () => {
              navigate('/signin');
              onClose();
            }}
          >
            {isMockAuth ? 'Mock Login' : 'Sign In'}
          </Button>
        )}
        
        {isAuthenticated && (
          <Box sx={{ mt: 2 }}>
            <Divider />
            <List>
              <ListItem button onClick={() => { 
                navigate('/profile'); 
                onClose();
              }}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              
              {isMockAuth && (
                <ListItem button onClick={() => {
                  login({ 
                    email: user?.isAdmin ? 'regular@example.com' : 'admin@example.com' 
                  });
                  onClose();
                }}>
                  <ListItemIcon><BugReportIcon /></ListItemIcon>
                  <ListItemText primary={`Switch to ${user?.isAdmin ? 'Regular User' : 'Admin User'}`} />
                </ListItem>
              )}
              
              <ListItem button onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;