import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';

const NavLinks = ({ isAuthenticated, vertical = false, onClick = null }) => {
  // Auth-specific navigation links
  const authLinks = [
    { text: 'Dashboard', path: '/dash', icon: <DashboardIcon /> },
    { text: 'Add Recipe', path: '/add', icon: <AddIcon /> },
  ];
  
  // Keep these links empty for non-authenticated users
  const guestLinks = [];
  
  // Choose links based on authentication status
  const links = isAuthenticated ? authLinks : guestLinks;
  
  return (
    <Box
      component="nav"
      sx={{ 
        display: 'flex', 
        flexDirection: vertical ? 'column' : 'row',
        width: vertical ? '100%' : 'auto' 
      }}
    >
      {links.map((link) => (
        <Button
          key={link.text}
          component={Link}
          to={link.path}
          startIcon={vertical ? link.icon : null}
          onClick={onClick}
          sx={{ 
            justifyContent: vertical ? 'flex-start' : 'center',
            color: (theme) => theme.palette.text.primary,
            textTransform: 'none',
            mx: vertical ? 0 : 1,
            px: vertical ? 2 : 1,
            py: vertical ? 1 : 0.5,
            width: vertical ? '100%' : 'auto',
            textAlign: 'left'
          }}
        >
          {link.text}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;