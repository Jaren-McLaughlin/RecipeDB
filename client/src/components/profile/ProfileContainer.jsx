import React from 'react';
import { Container, Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
import UserInfoCard from './UserInfoCard';
import UserStatsCard from './UserStatsCard';
import ProfileEditForm from './ProfileEditForm';
import PasswordChangeForm from './PasswordChangeForm';

function ProfileContainer({ 
  userData = {}, // Default to empty object
  loading,
  activeTab,
  handleEditToggle,
  handlePasswordToggle,
  handleProfileUpdate,
  handlePasswordUpdate 
}) {
  // Safe default values
  const safeUserData = {
    userName: '',
    email: '',
    bio: '',
    createdAt: new Date().toISOString(),
    recipeCount: 0,
    favoriteCount: 0,
    sharedCount: 0,
    ...userData // Spread actual userData over defaults
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
              user={safeUserData} 
              onEdit={handleEditToggle}
              onChangePassword={handlePasswordToggle}
            />
            <Box sx={{ mt: 3 }}>
            <UserStatsCard 
            stats={{
              recipeCount: userData.recipeCount,
              favoriteCount: userData.favoriteCount,
              sharedCount: userData.sharedCount
            }}
          />
            </Box>
          </Grid>
          
          {/* Right column: Forms or additional content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              {activeTab === 'view' ? (
                <>
                  <Typography variant="h6">Recent Activity</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    You've created {safeUserData.recipeCount} recipes.
                  </Typography>
                </>
              ) : activeTab === 'edit' ? (
                <ProfileEditForm
  userData={{
    userName: userData.userName,
    email: userData.email
  }}
  onCancel={handleEditToggle}
  onSubmit={handleProfileUpdate}
/>
              ) : (
                <PasswordChangeForm
                  onCancel={handlePasswordToggle}
                  onSubmit={handlePasswordUpdate}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProfileContainer;