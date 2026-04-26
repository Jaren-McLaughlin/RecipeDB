import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import ProfileContainer from '../components/profile/ProfileContainer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { verifyAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('view');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [userData, setUserData] = useState({ userName: '', email: '', bio: '', createdAt: new Date().toISOString(), recipeCount: 0, favoriteCount: 0, sharedCount: 0 });
  const hasFetchedProfile = useRef(false); //Prevent double fetch

  useEffect(() => {
    if (hasFetchedProfile.current) return; //Skip if already fetched
    
    const fetchUserData = async () => {
      hasFetchedProfile.current = true; //Mark as fetched before async call
      try {
        const response = await fetch('/api/profile', { credentials: 'include' });
        if (!response.ok) { navigate('/signin'); return; }
        const data = await response.json();
        setUserData(prev => ({ ...prev, userName: data.userName || prev.userName, email: data.email || prev.email, createdAt: data.createdAt || new Date().toISOString(), recipeCount: data.recipeCount || 0, favoriteCount: 0, sharedCount: 0 }));
      } catch (error) {
        setNotification({ open: true, message: error.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]); //Only navigate as dependency

  const handleProfileUpdate = async (updatedData) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
    setActiveTab('view');
  };

  const handlePasswordUpdate = async (passwordData) => setActiveTab('view');
  const handleNotificationClose = () => setNotification({ ...notification, open: false });

  if (loading) return (<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>);

  return (
    <>
      <ProfileContainer userData={userData} loading={loading} activeTab={activeTab} handleEditToggle={() => setActiveTab('edit')} handlePasswordToggle={() => setActiveTab('password')} handleProfileUpdate={handleProfileUpdate} handlePasswordUpdate={handlePasswordUpdate} onSave={handleProfileUpdate} />
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>{notification.message}</Alert>
      </Snackbar>
    </>
  );
}

export default ProfilePage;