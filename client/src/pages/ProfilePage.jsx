import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Grid } from '@mui/material';
import UserInfoCard from '../components/profile/UserInfoCard';
import UserStatsCard from '../components/profile/UserStatsCard';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import PasswordChangeForm from '../components/profile/PasswordChangeForm';
import PageContainer from '../components/layout/PageContainer';

function ProfilePage() {
  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  // Fetch user data (this would be replaced with actual API call)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserData({
        id: 1,
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        createdAt: '2024-01-15',
        recipeCount: 12,
        favoriteCount: 5,
        sharedCount: 3
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setPasswordMode(false);
  };

  const handlePasswordToggle = () => {
    setPasswordMode(!passwordMode);
    setEditMode(false);
  };

  const handleProfileUpdate = (data) => {
    // In a real app, you would call an API to update the user data
    console.log('Updating profile with:', data);
    setUserData({...userData, ...data});
    setEditMode(false);
  };

  const handlePasswordUpdate = (data) => {
    // In a real app, you would call an API to change the password
    console.log('Changing password, data:', data);
    setPasswordMode(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Left column: User info and stats */}
          <Grid item xs={12} md={4}>
            <UserInfoCard 
              userData={userData} 
              onEditClick={handleEditToggle}
              onPasswordClick={handlePasswordToggle}
            />
            <Box sx={{ mt: 3 }}>
              <UserStatsCard userData={userData} />
            </Box>
          </Grid>
          
          {/* Right column: Forms or additional content */}
          <Grid item xs={12} md={8}>
            {editMode ? (
              <ProfileEditForm 
                userData={userData}
                onCancel={handleEditToggle}
                onSave={handleProfileUpdate}
              />
            ) : passwordMode ? (
              <PasswordChangeForm 
                onCancel={handlePasswordToggle}
                onSave={handlePasswordUpdate}
              />
            ) : (
              <Box>
                {/* This space could be used for recent recipes or other profile content */}
                <Typography variant="h6" gutterBottom>
                  Welcome back, {userData.username}!
                </Typography>
                <Typography variant="body1">
                  This is your profile page where you can manage your account settings and view your recipe statistics.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Use the buttons on the left to edit your profile information or change your password.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProfilePage;