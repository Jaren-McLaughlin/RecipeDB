import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
import UserInfoCard from './UserInfoCard';
import UserStatsCard from './UserStatsCard';
import ProfileEditForm from './ProfileEditForm';
import PasswordChangeForm from './PasswordChangeForm';

function ProfileContainer({ 
  userData = {}, 
  loading,
  activeTab,
  handleEditToggle,
  handlePasswordToggle,
  handleProfileUpdate,
  handlePasswordUpdate 
}) {
  const [recipeCount, setRecipeCount] = useState(0)

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/dashboard`,{credentials:"include"})
    .then(r=>r.json())
    .then(data=>setRecipeCount(data.length))
    .catch(e=>console.error("Failed to fetch recipes",e))
  },[])

  const safeUserData = {
    userName: '',
    email: '',
    bio: '',
    createdAt: new Date().toISOString(),
    recipeCount: 0,
    favoriteCount: 0,
    sharedCount: 0,
    ...userData
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
          <Grid item xs={12} md={4}>
            <UserInfoCard 
              user={safeUserData} 
              onEdit={handleEditToggle}
              onChangePassword={handlePasswordToggle}
            />
            <Box sx={{ mt: 3 }}>
              <UserStatsCard 
                stats={{
                  recipeCount: recipeCount, //use fetched count
                  favoriteCount: userData.favoriteCount,
                  sharedCount: userData.sharedCount
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              {activeTab === 'view' ? (
                <>
                  <Typography variant="h6">Recent Activity</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    You've created {recipeCount} recipes.
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
