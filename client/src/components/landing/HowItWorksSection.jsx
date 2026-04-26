import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CollectionsIcon from '@mui/icons-material/Collections';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';

const steps = [
  {
    icon: <CreateIcon fontSize="large" />,
    title: 'Create an Account',
    description: 'Sign up for a free account to start organizing your recipes.',
    color: '#e57373' // light red
  },
  {
    icon: <CollectionsIcon fontSize="large" />,
    title: 'Add Your Recipes',
    description: 'Input your favorite recipes with ingredients, instructions, and notes.',
    color: '#81c784' // light green
  },
  {
    icon: <SearchIcon fontSize="large" />,
    title: 'Find & Use',
    description: 'Easily search and filter to find exactly what you need, when you need it.',
    color: '#64b5f6' // light blue
  },
  {
    icon: <ShareIcon fontSize="large" />,
    title: 'Share with Others',
    description: 'Share your culinary creations with family and friends.',
    color: '#ffb74d' // light orange
  }
];

const HowItWorksSection = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center"
          fontWeight="bold"
          mb={8}
        >
          How It Works
        </Typography>
        
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  height: '100%',
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 4,
                  border: '1px solid #eee',
                  transition: 'all 0.3s ease',
                  position: 'relative',  // Make the paper relative
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                {/* Step number badge */}
                <Box 
                  sx={{ 
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ddd',
                    position: 'absolute',  // Position relative to Paper
                    top: 16,
                    left: 16,
                    zIndex: 1,  // Ensure it's above other elements
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </Box>
                
                <Stack spacing={2} alignItems="center">
                  <Box 
                    sx={{ 
                      bgcolor: step.color,
                      color: 'white',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    {step.icon}
                  </Box>
                  
                  <Typography variant="h6" component="h3" fontWeight="medium">
                    {step.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;