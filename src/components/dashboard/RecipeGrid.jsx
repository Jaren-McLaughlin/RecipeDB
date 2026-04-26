// src/components/dashboard/RecipeGrid.jsx

/**
 * Displays a grid of recipe cards with optional loading state.
 * @memberof Dashboard
 * @function RecipeGrid
 * @param {Object} props
 * @param {Array} props.recipes - Array of recipe data objects
 * @param {boolean} props.loading - Whether recipes are loading
 * @param {Function} props.onEdit - Called when edit is clicked
 * @param {Function} props.onDelete - Called when delete is clicked
 * @param {Function} props.onShare - Called when share is clicked
 * @returns {JSX.Element}
 */

import React from 'react';
import { Grid, CircularProgress, Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';

function RecipeGrid({ recipes, loading, onEdit, onDelete, onShare }) {
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
            onShare={onShare}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeGrid;