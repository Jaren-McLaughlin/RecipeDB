// This page will:

// Fetch the current recipe data using the recipe ID from URL params
// Provide a form for editing all recipe details
// Handle form submission and API calls
// Provide navigation back to the recipe view

// src/pages/EditRecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import RecipeForm from '../components/recipe/RecipeForm';
import { fetchRecipe, updateRecipe } from '../Api/RecipeApi';

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ saving: false, error: null });
  
  // Fetch the recipe data
  useEffect(() => {
    async function loadRecipe() {
      try {
        // In a real app, you'd use the API call:
        // const recipeData = await fetchRecipe(id);
        
        // For now, we'll simulate fetching data
        setTimeout(() => {
          const mockRecipe = {
            id: parseInt(id),
            title: 'Sample Recipe ' + id,
            description: 'This is a detailed description of the recipe.',
            ingredients: [
              '2 cups flour',
              '1 cup sugar',
              '3 eggs',
              '1/2 tsp salt'
            ],
            instructions: [
              'Preheat oven to 350°F.',
              'Mix dry ingredients in a bowl.',
              'Add wet ingredients and mix well.',
              'Bake for 30 minutes.'
            ],
            notes: 'This recipe was passed down from my grandmother.'
          };
          
          setRecipe(mockRecipe);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error loading recipe:', error);
        setError('Failed to load recipe. Please try again.');
        setLoading(false);
      }
    }
    
    loadRecipe();
  }, [id]);
  
  // Handle form submission
  const handleSubmit = async (formData) => {
    setSaveStatus({ saving: true, error: null });
    
    try {
      // In a real app, you'd use the API call:
      // await updateRecipe(id, formData);
      
      // For now,  simulate the API call
      console.log('Saving updated recipe:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful save, navigate back to the recipe view
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('Error saving recipe:', error);
      setSaveStatus({ 
        saving: false, 
        error: 'Failed to save recipe. Please try again.' 
      });
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    navigate(`/recipe/${id}`);
  };
  
  // Show loading state
  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Recipe
      </Typography>
      
      {saveStatus.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {saveStatus.error}
        </Alert>
      )}
      
      <RecipeForm 
        recipe={recipe} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
      />
      
      {saveStatus.saving && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default EditRecipePage;