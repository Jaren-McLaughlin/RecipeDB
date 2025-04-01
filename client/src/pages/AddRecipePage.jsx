// src/pages/AddRecipePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import RecipeForm from '../components/recipe/RecipeForm';
import { createBlankRecipe } from '../models/Recipe';

function AddRecipePage() {
  const navigate = useNavigate();
  
  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      // In a real app, you'd call your API:
      // const newRecipe = await createRecipe(formData);
      
      // For now, just log the data and simulate success
      console.log('Creating new recipe:', formData);
      
      // Simulate a delay for API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // After successful creation, navigate to the dashboard
      navigate('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
      // You could add error handling here (e.g., show an error message)
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    navigate('/');
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Recipe
      </Typography>
      
      <RecipeForm 
        recipe={createBlankRecipe()} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
      />
    </Container>
  );
}

export default AddRecipePage;