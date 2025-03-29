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

  // Fetch recipes - This would be replaced with your actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRecipes = [
        { id: 1, title: 'Spaghetti Bolognese', description: 'Classic Italian pasta dish with meat sauce.' },
        { id: 2, title: 'Chicken Curry', description: 'Spicy chicken curry with coconut milk.' },
        { id: 3, title: 'Chocolate Cake', description: 'Rich and moist chocolate cake.' },
        { id: 4, title: 'Greek Salad', description: 'Fresh salad with feta cheese and olives.' },
        { id: 5, title: 'Beef Stir Fry', description: 'Quick and easy beef with vegetables.' },
        { id: 6, title: 'Vegetable Soup', description: 'Hearty soup with seasonal vegetables.' },
        { id: 7, title: 'Mushroom Risotto', description: 'Creamy Italian rice dish with mushrooms.' },
        { id: 8, title: 'Fish Tacos', description: 'Light and flavorful tacos with fresh fish.' },
        { id: 9, title: 'BBQ Chicken Wings', description: 'Spicy and tangy chicken wings for game day.' },
        { id: 10, title: 'Apple Pie', description: 'Classic American dessert with cinnamon and apples.' },
        { id: 11, title: 'Vegetable Lasagna', description: 'Layered pasta dish with vegetables and cheese.' },
        { id: 12, title: 'Beef Tacos', description: 'Traditional Mexican tacos with seasoned beef.' },
        { id: 13, title: 'Carrot Cake', description: 'Moist cake with cream cheese frosting.' },
        { id: 14, title: 'Chicken Noodle Soup', description: 'Comforting soup for cold days.' },
      ];
      setRecipes(mockRecipes);
      setFilteredRecipes(mockRecipes);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter recipes when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm, recipes]);

  // Update paginated recipes when filtered recipes, current page, or items per page changes
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
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleEdit = (id) => {
    // In a real app, navigate to edit page
    console.log(`Edit recipe with id of ${id}`);
    navigate(`/edit-recipe/${id}`);
    
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
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeToDelete.id);
    setRecipes(updatedRecipes);
    
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
      
      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      
      {/* Recipe Grid */}
      <Box sx={{ mt: 3 }}>
        <RecipeGrid 
          recipes={paginatedRecipes} 
          loading={loading}
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </Box>
      
      {/* Pagination Controls */}
      <PaginationControls
        totalItems={filteredRecipes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      
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