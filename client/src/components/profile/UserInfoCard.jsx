// src/components/profile/UserInfoCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Divider, 
  Avatar 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';

function UserInfoCard({ user, onEdit, onChangePassword }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {user?.userName || 'User'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user?.email || 'Loading email...'}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onEdit}
          fullWidth
          sx={{ mb: 1 }}
        >
          Edit Profile
        </Button>
        <Button 
          variant="outlined" 
          onClick={onChangePassword}
          fullWidth
        >
          Change Password
        </Button>
      </Box>
    </Paper>
  );
}

export default UserInfoCard;