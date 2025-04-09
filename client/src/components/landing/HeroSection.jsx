import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000', 
        color: 'white',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Food background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
      </Box>
      
      {/* Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 10,
          textAlign: 'center',
          px: 4,
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
          }}
        >
          Recipe Management Suite
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Store, organize, and share your favorite recipes in one beautiful place. 
          Never lose a recipe again.
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/dash')}
            sx={{ 
              bgcolor: 'white', 
              color: '#000000',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            Browse Recipes
          </Button>
          
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/signin')}
            sx={{ 
              borderColor: 'white', 
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;