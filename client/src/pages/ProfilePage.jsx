import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Grid,
  Paper,
  Divider,
  Button
} from '@mui/material';
import UserInfoCard from '../components/profile/UserInfoCard';
import UserStatsCard from '../components/profile/UserStatsCard';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import PasswordChangeForm from '../components/profile/PasswordChangeForm';
import ProfileContainer from '../components/profile/ProfileContainer';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function ProfilePage() {
  // State management
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('view'); // 'view', 'edit', 'password'
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with actual API call
        const mockData = {
          id: 1,
          username: 'ChefMaster',
          email: 'chef@example.com',
          avatar: '/default-avatar.jpg',
          bio: 'Passionate home cook sharing my favorite recipes',
          joinDate: '2023-05-15',
          recipeCount: 24,
          favoriteCount: 18,
          sharedCount: 7,
          lastLogin: '2025-04-01T14:30:00Z'
        };
        setUserData(mockData);
      } catch (error) {
        setNotification({
          open: true,
          message: 'Failed to load profile data',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handlers
  const handleProfileUpdate = async (updatedData) => {
    try {
      // API call would go here
      setUserData({ ...userData, ...updatedData });
      setActiveTab('view');
      setNotification({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to update profile',
        severity: 'error'
      });
    }
  };

  const handlePasswordUpdate = async (passwordData) => {
    try {
      // API call would go here
      setActiveTab('view');
      setNotification({
        open: true,
        message: 'Password changed successfully!',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to change password',
        severity: 'error'
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ProfileContainer>
      <Grid container spacing={3}>
        {/* Left Column - User Info and Stats */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <UserInfoCard 
              user={userData}
              onEdit={() => setActiveTab('edit')}
              onChangePassword={() => setActiveTab('password')}
            />
          </Paper>
          
          <Paper elevation={3} sx={{ p: 3 }}>
            <UserStatsCard 
              stats={{
                recipes: userData.recipeCount,
                favorites: userData.favoriteCount,
                shared: userData.sharedCount
              }}
            />
          </Paper>
        </Grid>

        {/* Right Column - Content Area */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {activeTab === 'view' && (
              <>
                <Typography variant="h5" gutterBottom>
                  Welcome back, {userData.username}!
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  {userData.bio || 'No bio provided.'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since: {new Date(userData.joinDate).toLocaleDateString()}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setActiveTab('edit')}
                    sx={{ mr: 2 }}
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => setActiveTab('password')}
                  >
                    Change Password
                  </Button>
                </Box>
              </>
            )}

            {activeTab === 'edit' && (
              <ProfileEditForm
                user={userData}
                onCancel={() => setActiveTab('view')}
                onSubmit={handleProfileUpdate}
              />
            )}

            {activeTab === 'password' && (
              <PasswordChangeForm
                onCancel={() => setActiveTab('view')}
                onSubmit={handlePasswordUpdate}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
}

export default ProfilePage;