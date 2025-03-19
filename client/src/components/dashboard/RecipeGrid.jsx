// src/components/Dashboard/RecipeGrid.jsx
import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import RecipeCard from './RecipeCard';

function RecipeGrid() {
  // In a real app, you would fetch recipes from your API
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    // This would be replaced with an actual API call
    setTimeout(() => {
      setRecipes([
        { id: 1, title: 'Spaghetti Bolognese', description: 'Classic Italian pasta dish with meat sauce.', ingredientCount: 8 },
        { id: 2, title: 'Chicken Curry', description: 'Spicy chicken curry with coconut milk.', ingredientCount: 10 },
        { id: 3, title: 'Chocolate Cake', description: 'Rich and moist chocolate cake.', ingredientCount: 7 },
        // Add more mock recipes as needed
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeGrid;