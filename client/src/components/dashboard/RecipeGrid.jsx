import React from 'react';
import { Grid, CircularProgress, Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';

function RecipeGrid({ recipes, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (recipes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, p: 3 }}>
        <Typography variant="h6" color="text.secondary">
          No recipes found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
          <RecipeCard 
            recipe={recipe} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeGrid;