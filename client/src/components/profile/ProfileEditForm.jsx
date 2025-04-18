import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Grid,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProfileEditForm({ userData = {}, onCancel, onSave }) {
  const navigate = useNavigate();

  // Initialize state with proper field names and fallbacks
  const [formData, setFormData] = useState({
    userName: userData.userName || '',
    email: userData.email || ''
  });
  
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Update form data when userData changes
  useEffect(() => {
    setFormData({
      userName: userData.userName || '',
      email: userData.email || ''
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userName || formData.userName.trim() === '') {
      newErrors.userName = 'Username is required';
    } else if (formData.userName.length < 3) {
      newErrors.userName = 'Username must be at least 3 characters';
    }
    
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const res1 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/username`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({userName: formData.userName})
      });
  
      if (!res1.ok) throw new Error('Username update failed');
  
      const res2 = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/email`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({email: formData.email})
      });
  
      if (!res2.ok) throw new Error('Email update failed');
  
      setNotification({open: true, message: 'Profile updated successfully', severity: 'success'});
      navigate('/profile');
  
    } catch (err) {
      setNotification({open: true, message: err.message, severity: 'error'});
    }
  };
  
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Edit Profile
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              error={Boolean(errors.userName)}
              helperText={errors.userName}
              variant="outlined"
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                type="submit"
                onClick={() => setTimeout(() => window.location.reload(), 1500)} //Go back and show changes

              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ProfileEditForm;