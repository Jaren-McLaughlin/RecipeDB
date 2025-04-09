import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Paper,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ApiTestPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Test connection to backend
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/test`)
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error connecting to backend:', error);
        setMessage('Failed to connect to backend. See console for details.');
        setLoading(false);
      });
  }, []);
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Recipe Management Suite
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Your personal recipe organization system
        </Typography>
        
        <Paper 
          elevation={3} 
          sx={{ 
            mt: 4, 
            p: 3, 
            backgroundColor: 'background.paper', 
            borderRadius: 2,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          <Typography variant="h6" gutterBottom>
            API Connection Test
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ my: 3 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  p: 2, 
                  bgcolor: message.includes('Failed') ? '#ffebee' : '#e8f5e9',
                  borderRadius: 1,
                  fontFamily: 'monospace'
                }}
              >
                {message || 'No response received'}
              </Typography>
            </Box>
          )}
          
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Go to Recipe Dashboard
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default ApiTestPage;