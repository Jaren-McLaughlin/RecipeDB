import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import RecipeForm from '../components/recipe/RecipeForm';

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ saving: false, error: null });

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/${id}`, {
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setRecipe({
          id: parseInt(id),
          title: data.title,
          ingredients: data.ingredients,
          instructions: data.instructions.split('\r\n'),
          notes: data.notes
        });
      } catch (error) {
        console.error('Error loading recipe:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaveStatus({ saving: true, error: null });
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          instructions: formData.instructions.join('\r\n'),
          notes: formData.notes,
          ingredients: formData.ingredients
        })
      });

      if (!response.ok) throw new Error('Save failed');
      navigate(`/recipes/${id}`);
    } catch (error) {
      setSaveStatus({ saving: false, error: error.message });
    }
  };

  const handleCancel = () => navigate(`/recipe/${id}`);

  if (loading) return <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Recipe
      </Typography>
      
      {saveStatus.error && <Alert severity="error" sx={{ mb: 3 }}>{saveStatus.error}</Alert>}
      
      {recipe && <RecipeForm 
        recipe={recipe} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
      />}
      
      {saveStatus.saving && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>}
    </Container>
  );
}

export default EditRecipePage;