// components/layout/UserMenu.jsx
import React, { useState } from 'react';
import { 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  useTheme 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import BugReportIcon from '@mui/icons-material/BugReport';

const UserMenu = ({ user, logout, login, isMockAuth }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // Use primary or secondary color based on theme mode
  const avatarBgColor = theme.palette.primary.main;
  const avatarTextColor = theme.palette.primary.contrastText;
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };
  
  // Get display name for avatar - either first letter of username or first letter of email
  const getAvatarText = () => {
    if (user?.userName) {
      return user.userName.charAt(0).toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };
  
  return (
    <>
      <IconButton 
        onClick={handleMenuOpen} 
        size="small"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          padding: 0.5,
          border: `2px solid ${avatarBgColor}`, 
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: `${avatarBgColor}22`, // 22 is hex for 13% opacity
          },
        }}
      >
        <Avatar 
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: avatarBgColor,
            color: avatarTextColor,
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {getAvatarText()}
        </Avatar>
      </IconButton>
      
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
            },
          }
        }}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => { navigate('/favorites'); handleMenuClose(); }}>
          <ListItemIcon>
            <BookmarkIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Favorites</ListItemText>
        </MenuItem>
        
        {isMockAuth && (
          <MenuItem onClick={() => {
            login({ email: user?.isAdmin ? 'regular@example.com' : 'admin@example.com' });
            handleMenuClose();
          }}>
            <ListItemIcon>
              <BugReportIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText>
              Switch to {user?.isAdmin ? 'Regular User' : 'Admin User'}
            </ListItemText>
          </MenuItem>
        )}
        
        <Divider sx={{ my: 1 }} />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;