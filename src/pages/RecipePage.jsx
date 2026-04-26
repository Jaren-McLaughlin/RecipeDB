// src/pages/RecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Alert, Snackbar } from '@mui/material';
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
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Recipe not found');
        }

        const data = await response.json();

        setRecipe({
          id: parseInt(id),
          title: data.title,
          ingredients: data.ingredients,
          instructions: Array.isArray(data.instructions)
            ? data.instructions
            : data.instructions.split('\n'),
          notes: data.notes
        });
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  const handleEdit = () => navigate(`/edit-recipe/${id}`);
  const handleDelete = () => setDeleteDialogOpen(true);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareCopied(true);
    });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      navigate('/dash');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete recipe');
    }
    setDeleteDialogOpen(false);
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
        onBack={() => navigate('/dash')}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onShare={handleShare}
      />

      {recipe && <RecipeDetails recipe={recipe} />}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title={recipe?.title || ''}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      <Snackbar
        open={shareCopied}
        autoHideDuration={3000}
        onClose={() => setShareCopied(false)}
        message="Share link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}

export default RecipePage;
