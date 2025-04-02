import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PasswordPolicy = ({ password }) => {
  // Password policy checks
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Password must:
      </Typography>
      <List dense sx={{ bgcolor: 'background.paper' }}>
        <PasswordRequirement 
          text="Be at least 8 characters long" 
          fulfilled={minLength} 
        />
        <PasswordRequirement 
          text="Contain at least one uppercase letter" 
          fulfilled={hasUpperCase} 
        />
        <PasswordRequirement 
          text="Contain at least one number" 
          fulfilled={hasNumber} 
        />
        <PasswordRequirement 
          text="Contain at least one special character" 
          fulfilled={hasSpecial} 
        />
      </List>
    </Box>
  );
};

const PasswordRequirement = ({ text, fulfilled }) => {
  return (
    <ListItem sx={{ py: 0 }}>
      <ListItemIcon sx={{ minWidth: 30 }}>
        {fulfilled ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <CancelIcon color="error" fontSize="small" />
        )}
      </ListItemIcon>
      <ListItemText 
        primary={text} 
        primaryTypographyProps={{ 
          variant: 'body2',
          color: fulfilled ? 'text.primary' : 'text.secondary' 
        }} 
      />
    </ListItem>
  );
};

export default PasswordPolicy;