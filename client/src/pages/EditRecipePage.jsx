import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
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
        
        // Format instructions as array for RecipeForm
        const instructionsArray = recipeData.instructions 
          ? recipeData.instructions.split(/\r?\n/).filter(line => line.trim() !== '')
          : [''];
        
        // Store original ingredients for comparison during update
        setOriginalIngredients(recipeData.ingredients);
        
        // Format ingredients for RecipeForm
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
      // Convert instructions array back to string for API
      const instructionsText = Array.isArray(formData.instructions) 
        ? formData.instructions.join('\n') 
        : formData.instructions || "";
      
      // Update recipe basic info
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
      
      // Process ingredients updates
      await handleIngredientChanges(formData);
      
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus({ saving: false, error: error.message });
    }
  };

  // Helper function to handle all ingredient-related changes
  const handleIngredientChanges = async (formData) => {
    // Map of original ingredients by ID for easy lookup
    const originalIngredientsMap = {};
    originalIngredients.forEach(ing => {
      originalIngredientsMap[ing.ingredientId] = ing;
    });
    
    // Find ingredients to delete (in original but not in form)
    const formIngredientIds = formData.ingredients
      .filter(ing => ing.id)
      .map(ing => ing.id);
      
    const ingredientsToRemove = originalIngredients
      .filter(ing => !formIngredientIds.includes(ing.ingredientId))
      .map(ing => ing.ingredientId);
    
    // Process deletions
    for (const ingredientId of ingredientsToRemove) {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          recipeId: parseInt(id),
          ingredientId: ingredientId
        })
      });
    }
    
    // Find ingredients to update (existing in both original and form)
    const ingredientsToUpdate = formData.ingredients
      .filter(ing => ing.id && 
        originalIngredientsMap[ing.id] && 
        ing.quantity.toString() !== originalIngredientsMap[ing.id].quantity.toString());
    
    if (ingredientsToUpdate.length > 0) {
      const updatePayload = ingredientsToUpdate.map(ing => ({
        currentIngredientId: ing.id,
        newIngredientId: ing.id,
        quantity: ing.quantity
      }));
      
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          recipeId: parseInt(id),
          ingredients: updatePayload
        })
      });
    }
    
    // Find new ingredients to add
    const newIngredients = formData.ingredients.filter(ing => !ing.id && ing.name.trim() !== '');
    
    if (newIngredients.length > 0) {
      // Convert form ingredient names to IDs using the available ingredients list
      const newIngredientsPayload = newIngredients
        .map(ing => {
          const matchedIngredient = ingredients.find(i => i.name === ing.name);
          return matchedIngredient ? {
            ingredientId: matchedIngredient.id,
            quantity: ing.quantity
          } : null;
        })
        .filter(Boolean); // Remove null entries
      
      if (newIngredientsPayload.length > 0) {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            recipeId: parseInt(id),
            ingredients: newIngredientsPayload
          })
        });
      }
    }
  };

  const handleCancel = () => navigate(`/recipes/${id}`);

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
          availableIngredients={ingredients}
        />
      )}
      
      {saveStatus.saving && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>}
    </Container>
  );
}

export default EditRecipePage;