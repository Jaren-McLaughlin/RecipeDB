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
        const [recipeResponse, ingredientsResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/${id}`, { credentials: 'include' }),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/ingredients`, { credentials: 'include' })
        ]);

        if (!recipeResponse.ok || !ingredientsResponse.ok) {
          throw new Error(`HTTP error! status: ${!recipeResponse.ok ? recipeResponse.status : ingredientsResponse.status}`);
        }

        const [recipeData, allIngredients] = await Promise.all([
          recipeResponse.json(),
          ingredientsResponse.json()
        ]);

        const ingredientMap = allIngredients.reduce((acc, ing) => {
          acc[ing.name] = ing.ingredientId;
          return acc;
        }, {});

        const enhancedIngredients = recipeData.ingredients.map(ing => ({
          ...ing,
          ingredientId: ingredientMap[ing.name]
        }));

        setOriginalIngredients(enhancedIngredients);
        setIngredients(allIngredients);

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
      const currentIngredientIds = new Set(
        currentIngredients
          .map(ing => ing.id ? parseInt(ing.id) : null)
          .filter(id => id !== null)
      );

      const updates = [];
      const additions = [];
      const newIngredientCreations = [];

      // Process updates and new additions
      for (const formIng of currentIngredients) {
        const quantity = parseFloat(formIng.quantity) || 0;
        
        if (formIng.id) {
          const ingredientId = parseInt(formIng.id);
          const originalIng = originalIngredients.find(oi => oi.ingredientId === ingredientId);

          if (originalIng) {
            // Check for ingredient metadata changes
            if (formIng.name !== originalIng.name || formIng.unit !== originalIng.measurement) {
              await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/ingredient`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                  ingredientId,
                  name: formIng.name.trim(),
                  measurement: formIng.unit
                })
              });
            }

            // Check for quantity changes
            if (quantity !== originalIng.quantity) {
              updates.push({
                currentIngredientId: ingredientId,
                newIngredientId: ingredientId,
                quantity: quantity
              });
            }
          } else {
            // Existing ingredient not in original (possibly from another recipe)
            additions.push({ ingredientId, quantity });
          }
        } else {
          // New ingredient creation
          const createResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/ingredient`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              name: formIng.name.trim(),
              measurement: formIng.unit
            })
          });

          if (!createResponse.ok) throw new Error(`Failed to create ingredient: ${await createResponse.text()}`);
          
          const newIng = await createResponse.json();
          newIngredientCreations.push({ ingredientId: newIng.ingredientId, quantity });
        }
      }

      // Batch process updates and additions
      if (updates.length > 0) {
        const updateResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            recipeId: id,
            ingredients: updates
          })
        });
        if (!updateResponse.ok) throw new Error(`Failed to update quantities: ${await updateResponse.text()}`);
      }

      const allAdditions = [...additions, ...newIngredientCreations];
      if (allAdditions.length > 0) {
        const addResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            recipeId: id,
            ingredients: allAdditions
          })
        });
        if (!addResponse.ok) throw new Error(`Failed to add ingredients: ${await addResponse.text()}`);
      }

      // Delete removed ingredients
      const ingredientsToDelete = originalIngredients
        .filter(oi => !currentIngredientIds.has(oi.ingredientId))
        .map(oi => oi.ingredientId);

      for (const ingredientId of ingredientsToDelete) {
        const deleteResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/usedIn`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ recipeId: id, ingredientId })
        });
        if (!deleteResponse.ok) throw new Error(`Failed to delete ingredient ${ingredientId}: ${await deleteResponse.text()}`);
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