import React from 'react';
import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <Box 
      sx={{ 
        py: 10, 
        bgcolor: 'primary.dark',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold"
              gutterBottom
            >
              Ready to organize your recipe collection?
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.8,
                mb: 4
              }}
            >
              Join thousands of home cooks who are already enjoying the benefits of Recipe Management Suite. Sign up today and get started for free.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                Create Free Account
              </Button>
              
              <Button 
                variant="outlined" 
                color="inherit"
                size="large"
                onClick={() => navigate('/signin')}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={6}
              sx={{ 
                py: 4, 
                px: 4, 
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.95)',
                color: 'text.primary'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <RestaurantIcon 
                  color="primary" 
                  fontSize="large" 
                  sx={{ mr: 1 }} 
                />
                <Typography variant="h5" fontWeight="bold">
                  Recipe Management Suite
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                ✓ Store unlimited recipes
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ Search by ingredient or name
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ Share with friends and family
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ Access on any device
              </Typography>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{ fontWeight: 'bold' }}
                >
                  Get Started Free
                </Button>
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  No credit card required
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CtaSection;