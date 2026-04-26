import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Snackbar, Box } from '@mui/material';
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
      const ingredients = formData.ingredients.map(ing => ({ name: ing.name, quantity: ing.quantity, unit: ing.unit, ingredientId: ing.id || null }));
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: formData.title, instructions: formData.instructions.join('\n'), notes: formData.notes, ingredients: ingredients })
      });
      if (!response.ok) throw new Error('Failed to create recipe');
      setSuccess(true);
      setTimeout(() => navigate(`/dash`), 500);
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
      <Typography variant="h4" component="h1" gutterBottom>Create New Recipe</Typography>
      <RecipeForm recipe={createBlankRecipe()} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={loading} />
      {loading && (<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}><CircularProgress /></Box>)}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => navigate('/dash')}>
        <Alert severity="success" sx={{ width: '100%' }}>Recipe created successfully!</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)} sx={{ width: '100%' }}>{error}</Alert>
      </Snackbar>
    </Container>
  );
}

export default AddRecipePage;