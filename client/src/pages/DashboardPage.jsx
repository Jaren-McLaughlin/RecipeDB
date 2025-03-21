import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeGrid from '../components/dashboard/RecipeGrid';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';

function DashboardPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // Fetch recipes
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecipes([
        { id: 1, title: 'Spaghetti Bolognese', description: 'Classic Italian pasta dish with meat sauce.' },
        { id: 2, title: 'Chicken Curry', description: 'Spicy chicken curry with coconut milk.' },
        { id: 3, title: 'Chocolate Cake', description: 'Rich and moist chocolate cake.' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Handler functions
  const handleEdit = (id) => {
    // In a real app, navigate to edit page
    console.log(`Edit recipe with id of ${id}`);
    // navigate(`/recipe/edit/${id}`);
    
    // For now, just show a notification
    setNotification({
      open: true,
      message: `Editing recipe ${id}`,
      severity: 'info'
    });
  };
  
  const handleDelete = (id) => {
    // Find the recipe to delete (for showing title in confirmation)
    const recipe = recipes.find(r => r.id === id);
    setRecipeToDelete(recipe);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!recipeToDelete) return;
    
    // In a real app, call API to delete recipe
    console.log(`Deleting recipe ${recipeToDelete.id}`);
    
    // Update local state
    setRecipes(recipes.filter(recipe => recipe.id !== recipeToDelete.id));
    
    // Close dialog and show notification
    setDeleteDialogOpen(false);
    setNotification({
      open: true,
      message: `Recipe "${recipeToDelete.title}" deleted`,
      severity: 'success'
    });
    setRecipeToDelete(null);
  };
  
  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Recipes
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <RecipeGrid 
          recipes={recipes} 
          loading={loading}
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </Box>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title={recipeToDelete?.title || ''}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
      
      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DashboardPage;