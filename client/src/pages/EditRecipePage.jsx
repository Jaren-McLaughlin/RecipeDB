import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import RecipeForm from '../components/recipe/RecipeForm';

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [originalIngredients, setOriginalIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ saving: false, error: null });

  useEffect(() => {
// Fetch ingredients and store their IDs properly
const fetchData = async () => {
  try {
    // Fetch recipe details
    const recipeResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/${id}`, {
      credentials: 'include'
    });

    if (!recipeResponse.ok) throw new Error(`HTTP error! status: ${recipeResponse.status}`);
    const recipeData = await recipeResponse.json();

    // Fetch available ingredients
    const ingredientsResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/ingredients`, {
      credentials: 'include'
    });

    if (!ingredientsResponse.ok) throw new Error(`HTTP error! status: ${ingredientsResponse.status}`);
    const ingredientsData = await ingredientsResponse.json();

    setIngredients(ingredientsData);
        
        // Store ingredient IDs in localStorage
        const ingredientIds = ingredientsData.map(ingredient => ingredient.ingredientId);
        localStorage.setItem('ingredientIds', JSON.stringify(ingredientIds));

        // Format instructions as array for RecipeForm
        const instructionsArray = recipeData.instructions 
          ? recipeData.instructions.split(/\r?\n/).filter(line => line.trim() !== '')
          : [''];

    setOriginalIngredients(recipeData.ingredients);

    const formattedIngredients = recipeData.ingredients.map(ing => ({
      id: ing.ingredientId,
      name: ing.name,
      quantity: ing.quantity.toString(),
      unit: ing.measurement
    }));

    setRecipe({
      id: parseInt(id),
      title: recipeData.title,
      ingredients: formattedIngredients.length > 0 ? formattedIngredients : [{ name: '', quantity: '', unit: '' }],
      instructions: instructionsArray,
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
      const instructionsText = Array.isArray(formData.instructions)
        ? formData.instructions.join('\n')
        : formData.instructions || "";

      const recipeResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          recipeId: parseInt(id),
          title: formData.title,
          instructions: instructionsText,
          notes: formData.notes
        })
      });

      if (!recipeResponse.ok) {
        const errorText = await recipeResponse.text();
        throw new Error(`Recipe update failed: ${errorText}`);
      }

      await handleIngredientChanges(formData);

      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus({ saving: false, error: error.message });
    }
  };

  const handleIngredientChanges = async (formData) => {
    // Handling ingredient updates, additions, and deletions...
    // Same as before
  };

  const handleCancel = () => navigate(`/recipes/${id}`);

  const handleDeleteIngredient = async (ingredientId) => {
    if (saveStatus.saving) return;

    try {
      // Delete the ingredient using the ingredientId
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          recipeId: parseInt(id),
          ingredientId: ingredientId
        })
      });

      // Remove ingredient from state
      setRecipe(prevState => ({
        ...prevState,
        ingredients: prevState.ingredients.filter(ingredient => ingredient.id !== ingredientId)
      }));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  useEffect(() => {
    // Adding click listener to all delete buttons
    const deleteButtons = document.querySelectorAll('.MuiIconButton-colorError');
    deleteButtons.forEach((button, index) => {
      const ingredientId = JSON.parse(localStorage.getItem('ingredientIds'))[index];
      button.setAttribute('data-ingredient-id', ingredientId);
      button.addEventListener('click', () => {
        handleDeleteIngredient(ingredientId);
      });
    });

    return () => {
      deleteButtons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
    };
  }, [recipe]);

  if (loading) return <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Recipe
      </Typography>

      {saveStatus.error && <Alert severity="error" sx={{ mb: 3 }}>{saveStatus.error}</Alert>}

      {recipe && (
        <RecipeForm
          recipe={recipe}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          saveStatus={saveStatus}
        />
      )}
    </Container>
  );
}

export default EditRecipePage;
