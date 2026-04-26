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
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user, verifyAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('view');
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'info' 
  });

  // Fetch user data
  // Initialize userData with proper structure
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    bio: '',
    createdAt: new Date().toISOString(),
    recipeCount: 0,
    favoriteCount: 0,
    sharedCount: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
          credentials: 'include'
        });

        if (response.status === 401) {
          navigate('/signin');
          return;
        }

        if (!response.ok) throw new Error('Failed to load profile data');

        const data = await response.json();
        setUserData(prev => ({
          ...prev, // Keep existing defaults
          userName: data.userName || prev.userName,
          email: data.email || prev.email,
          bio: data.bio || '',
          createdAt: data.createdAt || new Date().toISOString(),
          recipeCount: data.recipeCount || 0,
          favoriteCount: data.favoriteCount || 0,
          sharedCount: data.sharedCount || 0
        }));
      } catch (error) {
        setNotification({
          open: true,
          message: error.message,
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleProfileUpdate = async (updatedData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      // Refresh user data
      const updatedUser = await response.json();
      setUserData(updatedUser);
      await verifyAuth(); // Update auth context
      
      setNotification({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
      setActiveTab('view');
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  const handlePasswordUpdate = async (passwordData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      setNotification({
        open: true,
        message: 'Password changed successfully!',
        severity: 'success'
      });
      setActiveTab('view');
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
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
    <>
      <ProfileContainer
        userData={userData}
        loading={loading}
        activeTab={activeTab}
        handleEditToggle={() => setActiveTab('edit')}
        handlePasswordToggle={() => setActiveTab('password')}
        onSave={handleProfileUpdate} // Changed prop name to onSave
        onPasswordChange={handlePasswordUpdate}
      />
      
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
    </>
  );
}

export default ProfilePage;