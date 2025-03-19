import React, { useEffect, useState } from 'react';
import './App.css';
import PageContainer from './components/layout/PageContainer';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Test connection to backend
    fetch('/api/test')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error connecting to backend:', error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="App">
      <PageContainer>
        <Container maxWidth="lg">
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Recipe Management Suite
            </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
              Your personal recipe organization system
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              message && (
                <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body1">
                    Backend connection: {message}
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </Container>
      </PageContainer>
    </div>
  );
}

export default App;