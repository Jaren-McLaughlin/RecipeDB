import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import RecipeForm from '../components/recipe/RecipeForm';

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ saving: false, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Recipe not found');
        }

        const recipeData = await response.json();

        //Transform ingredients to expected format
        const formattedIngredients = (recipeData.ingredients || []).map(ing => ({
          id: ing.ingredientId,
          name: ing.name,
          quantity: ing.quantity.toString(),
          unit: ing.measurement
        }));

        setRecipe({
          id: parseInt(id),
          title: recipeData.title,
          ingredients: formattedIngredients,
          instructions: typeof recipeData.instructions === 'string' 
            ? recipeData.instructions.split(/\r?\n/).filter(Boolean) 
            : recipeData.instructions || [''],
          notes: recipeData.notes || ""
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaveStatus({ saving: true, error: null });

    try {
      //Prepare ingredients
      const ingredients = formData.ingredients.map(ing => ({
        ingredientId: ing.id || null,
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit
      }));

      const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title,
          instructions: formData.instructions.join('\n'),
          notes: formData.notes,
          ingredients: ingredients
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus({ saving: false, error: error.message });
    }
  };

  const handleCancel = () => navigate('/dash');

  if (loading) return <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Recipe
      </Typography>
      {saveStatus.error && <Alert severity="error" sx={{ mb: 3 }}>{saveStatus.error}</Alert>}
      {recipe && <RecipeForm recipe={recipe} onSubmit={handleSubmit} onCancel={handleCancel} />}
    </Container>
  );
}

export default EditRecipePage;