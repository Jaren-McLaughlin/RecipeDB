import React from 'react';
import { Box, Typography, Button, Container, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import heroBackground from '../../assets/images/hero.jpg'

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 10, md: 15 },
        position: 'relative',
        minHeight: '80vh', // Ensures minimum height for the hero section
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
            backdropFilter: 'blur(10px)', // Creates the cloudy effect
            borderRadius: 2,
            py: 5,
            px: { xs: 3, md: 6 },
            maxWidth: 'md',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold"
            color="#000000"
            sx={{ mb: 2 }}
          >
            Your Personal Recipe Collection
          </Typography>
          
          <Typography 
            variant="h5" 
            color="#0f0f0f"
            sx={{ mb: 4 }}
          >
            Store, organize, and easily manage your recipes in one place
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
          >
            <Button 
              variant="contained" 
              size="large"
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{ 
                py: 1.5, 
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              color="primary"
              onClick={() => navigate('/signin')}
              sx={{ 
                py: 1.5, 
                px: 4,
                fontSize: '1.1rem'
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;