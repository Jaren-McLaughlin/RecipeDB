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
    const fetchData = async () => {
      try {
        const recipeResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/${id}`, {
          credentials: 'include'
        });

        if (!recipeResponse.ok) throw new Error(`HTTP error! status: ${recipeResponse.status}`);
        const recipeData = await recipeResponse.json();

        const ingredientsResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/ingredients`, {
          credentials: 'include'
        });

        if (!ingredientsResponse.ok) throw new Error(`HTTP error! status: ${ingredientsResponse.status}`);
        const allIngredients = await ingredientsResponse.json();
        setIngredients(allIngredients);

        const ingredientMap = {};
        allIngredients.forEach(ing => {
          ingredientMap[ing.name] = ing.ingredientId;
        });

        const enhancedIngredients = recipeData.ingredients.map(ing => ({
          ...ing,
          ingredientId: ingredientMap[ing.name]
        }));

        localStorage.setItem('ingredientIds', JSON.stringify(enhancedIngredients.map(i => i.ingredientId)));
        setOriginalIngredients(enhancedIngredients);

        const formattedIngredients = enhancedIngredients.map(ing => ({
          id: ing.ingredientId,
          name: ing.name,
          quantity: ing.quantity.toString(),
          unit: ing.measurement
        }));

        setRecipe({
          id: parseInt(id),
          title: recipeData.title,
          ingredients: formattedIngredients,
          instructions: recipeData.instructions?.split(/\r?\n/).filter(Boolean) || [''],
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
      // Update recipe metadata
      const recipeResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          recipeId: parseInt(id),
          title: formData.title,
          instructions: formData.instructions.join('\n'),
          notes: formData.notes
        })
      });

      if (!recipeResponse.ok) throw new Error(`Recipe update failed: ${await recipeResponse.text()}`);

      // Handle ingredient updates
      await handleIngredientChanges(formData);
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus({ saving: false, error: error.message });
    }
  };

  const handleIngredientChanges = async (formData) => {
    try {
      const currentIngredients = formData.ingredients.filter(ing => ing.name.trim() && ing.quantity.trim());
      
      // Handle deletions
      const originalIds = originalIngredients.map(ing => ing.ingredientId);
      const currentIds = currentIngredients.filter(ing => ing.id).map(ing => parseInt(ing.id));
      const ingredientsToDelete = originalIds.filter(id => !currentIds.includes(id));

      for (const ingredientId of ingredientsToDelete) {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ recipeId: id, ingredientId })
        });
      }

      // Handle updates and creations
      const updatePayload = [];
      for (const formIng of currentIngredients) {
        // Existing ingredient
        if (formIng.id) {
          const originalIng = originalIngredients.find(ing => ing.ingredientId === parseInt(formIng.id));
          
          // Check if ingredient details changed
          if (originalIng && (
            formIng.name !== originalIng.name ||
            formIng.unit !== originalIng.measurement
          )) {
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/ingredient`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                ingredientId: formIng.id,
                name: formIng.name,
                measurement: formIng.unit
              })
            });
          }

          // Always update quantity
          updatePayload.push({
            currentIngredientId: parseInt(formIng.id),
            newIngredientId: parseInt(formIng.id),
            quantity: parseFloat(formIng.quantity)
          });
        }
        // New ingredient
        else {
          const existingIng = ingredients.find(ing => 
            ing.name.toLowerCase() === formIng.name.trim().toLowerCase()
          );

          if (existingIng) {
            updatePayload.push({
              currentIngredientId: existingIng.ingredientId,
              newIngredientId: existingIng.ingredientId,
              quantity: parseFloat(formIng.quantity)
            });
          } else {
            const newIngResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/ingredient`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                name: formIng.name.trim(),
                measurement: formIng.unit
              })
            });
            const newIng = await newIngResponse.json();
            updatePayload.push({
              currentIngredientId: newIng.ingredientId,
              newIngredientId: newIng.ingredientId,
              quantity: parseFloat(formIng.quantity)
            });
          }
        }
      }

      // Bulk update usedIn relationships
      if (updatePayload.length > 0) {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            recipeId: id,
            ingredients: updatePayload
          })
        });
      }

    } catch (error) {
      console.error('Error updating ingredients:', error);
      throw error;
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