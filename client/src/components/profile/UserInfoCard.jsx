// src/components/profile/UserInfoCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Divider, 
  Avatar 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';

function UserInfoCard({ userData, onEditClick, onPasswordClick }) {
  return (
    <Card sx={{ 
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
      '&:hover': {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',  // Same shadow on hover
        transform: 'none'  // Prevent any transform
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main',
              fontSize: '2rem',
              mb: 2
            }}
          >
            {userData.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" component="div">
            {userData.username}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {userData.email}
        </Typography>
        
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button 
            startIcon={<EditIcon />} 
            variant="outlined" 
            fullWidth
            onClick={onEditClick}
          >
            Edit Profile
          </Button>
          <Button 
            startIcon={<LockIcon />} 
            variant="outlined" 
            fullWidth
            onClick={onPasswordClick}
          >
            Change Password
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserInfoCard;