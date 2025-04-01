// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeGrid from '../components/dashboard/RecipeGrid';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';
import SearchBar from '../components/dashboard/SearchBar';
import PaginationControls from '../components/dashboard/PaginationControls';

function DashboardPage() {
  // State for recipes data
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [paginatedRecipes, setPaginatedRecipes] = useState([]);
  
  // State for UI controls
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // State for delete functionality
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  
  // State for notifications
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  
  const navigate = useNavigate();

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const userId = 1; // Hardcoded for testing
        const response = await fetch(`http://localhost:5001/api/recipes/dashboard/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        
        const data = await response.json();
        const formattedRecipes = data.recipeList.map(recipe => ({
          id: recipe.recipeId,
          title: recipe.title,
          description: `Created by ${recipe.userName}`
        }));

        setRecipes(formattedRecipes);
        setFilteredRecipes(formattedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setNotification({
          open: true,
          message: 'Failed to load recipes. Please try again later.',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes when search term changes
  useEffect(() => {
    const filterRecipes = () => {
      if (searchTerm.trim() === '') {
        return recipes;
      }
      return recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    setFilteredRecipes(filterRecipes());
    setCurrentPage(1);
  }, [searchTerm, recipes]);

  // Update paginated recipes
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedRecipes(filteredRecipes.slice(startIndex, endIndex));
  }, [filteredRecipes, currentPage, itemsPerPage]);

  // Handler functions
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleViewRecipe = async (recipeId) => {
    // Directly navigate to the recipe view page with ID in URL
    navigate(`/recipes/${recipeId}`);
  };

  const handleEdit = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  
  const handleDelete = (id) => {
    const recipe = recipes.find(r => r.id === id);
    setRecipeToDelete(recipe);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!recipeToDelete) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/recipes/${recipeToDelete.id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Delete failed');
      
      const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeToDelete.id);
      setRecipes(updatedRecipes);
      
      setNotification({
        open: true,
        message: `Recipe "${recipeToDelete.title}" deleted successfully`,
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to delete recipe. Please try again.',
        severity: 'error'
      });
    }
    
    setDeleteDialogOpen(false);
    setRecipeToDelete(null);
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Recipes
      </Typography>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      
      <Box sx={{ mt: 3 }}>
        <RecipeGrid 
          recipes={paginatedRecipes} 
          loading={loading}
          onView={handleViewRecipe}
          onEdit={handleEdit}
          onDelete={handleDelete} 
        />
      </Box>
      
      <PaginationControls
        totalItems={filteredRecipes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title={recipeToDelete?.title || ''}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
      
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