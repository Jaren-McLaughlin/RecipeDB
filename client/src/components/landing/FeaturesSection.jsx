import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import DevicesIcon from '@mui/icons-material/Devices';

const features = [
  {
    icon: <CollectionsBookmarkIcon fontSize="large" />,
    title: 'Organize Recipes',
    description: 'Store your recipes in a standardized format for easy reference and management.'
  },
  {
    icon: <SearchIcon fontSize="large" />,
    title: 'Quick Search',
    description: 'Find any recipe in seconds with powerful search capabilities.'
  },
  {
    icon: <ShareIcon fontSize="large" />,
    title: 'Share Favorites',
    description: 'Share your favorite recipes with family and friends with just a click.'
  },
  {
    icon: <DevicesIcon fontSize="large" />,
    title: 'Access Anywhere',
    description: 'Access your recipes from any device with our responsive design.'
  }
];

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          Features
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <CardContent>
                  <Box 
                    sx={{ 
                      color: 'primary.main', 
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;