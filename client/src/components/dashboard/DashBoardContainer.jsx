
/**
 * Container component for the recipes dashboard.
 * @memberof Dashboard
 * @function DashboardContainer
 * @returns {JSX.Element} Container component for the dashboard
 * @example
 * <DashboardContainer />
 */
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import RecipeGrid from './RecipeGrid';

function DashboardContainer() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Recipes
      </Typography>
      
      {/* Search bar could go here */}
      
      <Box sx={{ mt: 3 }}>
        <RecipeGrid />
      </Box>
    </Container>
  );
}

export default DashboardContainer;