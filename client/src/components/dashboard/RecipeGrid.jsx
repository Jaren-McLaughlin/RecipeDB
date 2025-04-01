

/**
 * Displays a grid of recipe cards with optional loading state.
 * @memberof Dashboard
 * @function RecipeGrid
 * @param {Object} props - Component properties
 * @param {Array} props.recipes - Array of recipe data objects
 * @param {boolean} props.loading - Whether recipes are currently loading
 * @param {Function} props.onEdit - Function called when edit button is clicked on a recipe
 * @param {Function} props.onDelete - Function called when delete button is clicked on a recipe
 * @returns {JSX.Element} Grid layout of recipe cards
 * @example
 * const recipes = [
 *   { id: 1, title: "Pancakes", description: "Breakfast favorite" },
 *   { id: 2, title: "Lasagna", description: "Italian classic" }
 * ];
 * 
 * <RecipeGrid 
 *   recipes={recipes}
 *   loading={false}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 */

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
