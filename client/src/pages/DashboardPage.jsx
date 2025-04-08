import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeGrid from '../components/dashboard/RecipeGrid';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';
import SearchBar from '../components/dashboard/SearchBar';
import PaginationControls from '../components/dashboard/PaginationControls';
import { useAuth } from '../contexts/AuthContext';

function DashboardPage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [paginatedRecipes, setPaginatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/signin', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes`, {
          method: 'GET',
          credentials: 'include'
        });

        if (response.status === 401) {
          navigate('/signin');
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch recipes');

        const data = await response.json();
        const formattedRecipes = data.map(recipe => ({
          id: recipe.id,
          title: recipe.title,
          notes: recipe.description,
          createdAt: recipe.createdAt
        }));

        setRecipes(formattedRecipes);
        setFilteredRecipes(formattedRecipes);
      } catch (error) {
        console.error('Error:', error);
        setNotification({
          open: true,
          message: error.message || 'Failed to load recipes',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchRecipes();
    }
  }, [isAuthenticated, navigate]);


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

  const handleViewRecipe = (recipeId) => {
    navigate(`/ingredients/${recipeId}`);
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recipes/${recipeToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/signin');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }

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
        message: error.message || 'Failed to delete recipe',
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