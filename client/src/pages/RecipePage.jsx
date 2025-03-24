// src/pages/RecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';

// Import the extracted components
import RecipeActionBar from '../components/recipe/RecipeActionBar';
import RecipeDetails from '../components/recipe/RecipeDetails';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';

function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch recipe data (same as before)
  useEffect(() => {
    // Simulate fetching recipe data
    setTimeout(() => {
      setRecipe({
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
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const handleEdit = () => {
    console.log('Edit recipe', id);
    navigate(`/edit-recipe/${id}`)
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting recipe', id);
    setDeleteDialogOpen(false);
    navigate('/');
  };

  const goBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <RecipeActionBar 
        onBack={goBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <RecipeDetails recipe={recipe} />
      
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title={recipe.title}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}

export default RecipePage;