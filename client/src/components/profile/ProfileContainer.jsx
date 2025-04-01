import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
import UserInfoCard from './UserInfoCard';
import UserStatsCard from './UserStatsCard';
import ProfileEditForm from './ProfileEditForm';
import PasswordChangeForm from './PasswordChangeForm';

function ProfileContainer() {
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
        recipeCount: 12
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
                onSave={(data) => {
                  // Would update user data via API
                  setUserData({...userData, ...data});
                  setEditMode(false);
                }}
              />
            ) : passwordMode ? (
              <PasswordChangeForm 
                onCancel={handlePasswordToggle}
                onSave={() => {
                  // Would update password via API
                  setPasswordMode(false);
                }}
              />
            ) : (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Recent Activity</Typography>
                {/* Could show recent recipes, etc. */}
                <Typography variant="body1" sx={{ mt: 2 }}>
                  You've created {userData.recipeCount} recipes.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProfileContainer;