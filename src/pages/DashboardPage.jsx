// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Typography, Box, Snackbar, Alert, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeGrid from '../components/dashboard/RecipeGrid';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';
import SearchBar from '../components/dashboard/SearchBar';
import PaginationControls from '../components/dashboard/PaginationControls';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../hooks/useWebSocket';

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
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [quoteLoading, setQuoteLoading] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const hasFetchedRecipes = useRef(false);
  const hasFetchedQuote = useRef(false);

  const handleWebSocketMessage = useCallback((data) => {
    if (data.type === 'recipeCreated') {
      setNotification({ open: true, message: `🔔 ${data.userName} just added "${data.recipeName}"!`, severity: 'info' });
    } else if (data.type === 'recipeUpdated') {
      setNotification({ open: true, message: `🔔 ${data.userName} updated "${data.recipeName}"!`, severity: 'info' });
    } else if (data.type === 'recipeDeleted') {
      setNotification({ open: true, message: `🔔 ${data.userName} deleted "${data.recipeName}"`, severity: 'warning' });
    }
  }, []);

  const { isConnected } = useWebSocket(handleWebSocketMessage);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/signin', { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (!isAuthenticated || hasFetchedQuote.current) return;
    const fetchQuote = async () => {
      hasFetchedQuote.current = true;
      setQuoteLoading(true);
      try {
        const response = await fetch('https://api.quotable.kurokeita.dev/api/quotes/random');
        if (response.ok) {
          const data = await response.json();
          setQuote({ text: data.quote.content, author: data.quote.author.name });
        }
      } catch (error) {
        console.error('Failed to fetch quote:', error);
      } finally {
        setQuoteLoading(false);
      }
    };
    fetchQuote();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || hasFetchedRecipes.current) return;
    const fetchRecipes = async () => {
      hasFetchedRecipes.current = true;
      try {
        setLoading(true);
        const response = await fetch('/api/recipes', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        const formatted = data.map(recipe => ({
          id: recipe.recipeId,
          title: recipe.title,
          notes: recipe.notes,
          createdAt: recipe.createdAt
        }));
        setRecipes(formatted);
        setFilteredRecipes(formatted);
      } catch (error) {
        setNotification({ open: true, message: error.message || 'Failed to load recipes', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [isAuthenticated]);

  useEffect(() => {
    const filtered = recipes.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [searchTerm, recipes]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    setPaginatedRecipes(filteredRecipes.slice(start, start + itemsPerPage));
  }, [filteredRecipes, currentPage, itemsPerPage]);

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setNotification({ open: true, message: '🔗 Share link copied to clipboard!', severity: 'success' });
    });
  };

  const handleDelete = (id) => {
    const recipe = recipes.find(r => r.id === id);
    setRecipeToDelete(recipe);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!recipeToDelete) return;
    try {
      const response = await fetch(`/api/recipes/${recipeToDelete.id}`, { method: 'DELETE', credentials: 'include' });
      if (!response.ok) throw new Error('Failed to delete recipe');
      setRecipes(prev => prev.filter(r => r.id !== recipeToDelete.id));
      setNotification({ open: true, message: `"${recipeToDelete.title}" deleted`, severity: 'success' });
    } catch (error) {
      setNotification({ open: true, message: error.message || 'Failed to delete recipe', severity: 'error' });
    }
    setDeleteDialogOpen(false);
    setRecipeToDelete(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 0 }}>
          My Recipes
        </Typography>
        {isConnected && (
          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              bgcolor: 'success.main', mr: 1,
              animation: 'pulse 2s infinite'
            }} />
            <Typography variant="caption" color="text.secondary">Live</Typography>
          </Box>
        )}
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        {quoteLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress sx={{ color: 'white' }} size={24} /></Box>
        ) : quote.text ? (
          <>
            <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>"{quote.text}"</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right', opacity: 0.9 }}>— {quote.author}</Typography>
          </>
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.8 }}>Loading inspirational quote...</Typography>
        )}
      </Paper>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Box sx={{ mt: 3 }}>
        <RecipeGrid
          recipes={paginatedRecipes}
          loading={loading}
          onEdit={(id) => navigate(`/edit-recipe/${id}`)}
          onDelete={handleDelete}
          onShare={handleShare}
        />
      </Box>

      <PaginationControls
        totalItems={filteredRecipes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title={recipeToDelete?.title || ''}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification(n => ({ ...n, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setNotification(n => ({ ...n, open: false }))} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </Container>
  );
}

export default DashboardPage;