// src/pages/RecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Alert } from '@mui/material';
import RecipeActionBar from '../components/recipe/RecipeActionBar';
import RecipeDetails from '../components/recipe/RecipeDetails';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';

function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/recipes/${id}`);
        if (!response.ok) throw new Error('Recipe not found');
        
        const data = await response.json();
        setRecipe({
          id: parseInt(id),
          title: data.title,
          ingredients: data.ingredients,
          instructions: data.instructions.split('\r\n'),
          notes: data.notes
        });
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/recipes/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Delete failed');
      navigate('/');
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete recipe');
    }
    setDeleteDialogOpen(false);
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

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <RecipeActionBar 
        onBack={() => navigate('/')}
        onEdit={() => navigate(`/edit-recipe/${id}`)}
        onDelete={handleDelete}
      />
      
      {recipe && <RecipeDetails recipe={recipe} />}
      
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title={recipe?.title || ''}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}

export default RecipePage;