import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  CircularProgress,
  Alert,
  Snackbar,
  Box 
} from '@mui/material';
import RecipeForm from '../components/recipe/RecipeForm';
import { createBlankRecipe } from '../models/Recipe';

function AddRecipePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      // First create new ingredients that don't have IDs
      const ingredientsWithIds = await Promise.all(
        formData.ingredients.map(async (ingredient) => {
          if (ingredient.id) {
            // Existing ingredient
            return {
              ingredientId: ingredient.id,
              quantity: parseFloat(ingredient.quantity) || 0
            };
          }

          // Create new ingredient
          const ingredientResponse = await fetch('/api/recipes/ingredient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              name: ingredient.name,
              measurement: ingredient.unit
            })
          });

          if (!ingredientResponse.ok) {
            const errorData = await ingredientResponse.json();
            throw new Error(errorData.error || 'Failed to create ingredient');
          }

          const newIngredient = await ingredientResponse.json();
          return {
            ingredientId: newIngredient.ingredientId,
            quantity: parseFloat(ingredient.quantity) || 0
          };
        })
      );

      // Create the recipe
      const recipeResponse = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title,
          instructions: formData.instructions.join('\n'),
          notes: formData.notes,
          ingredients: ingredientsWithIds
        })
      });

      if (!recipeResponse.ok) {
        const errorData = await recipeResponse.json();
        throw new Error(errorData.error || 'Failed to create recipe');
      }

      const recipeData = await recipeResponse.json();
      setSuccess(true);
      setTimeout(() => navigate(`/dash`), 200);
    } catch (error) {
      console.error('Error creating recipe:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate('/dash');

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Recipe
      </Typography>

      <RecipeForm 
        recipe={createBlankRecipe()} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        isSubmitting={loading}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => navigate('/dash')}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Recipe created successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert 
          severity="error" 
          onClose={() => setError(null)}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddRecipePage;