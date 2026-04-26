// src/pages/ViewRecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Chip
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ViewRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/public/${id}`);

        if (!response.ok) {
          throw new Error('Recipe not found or is no longer available.');
        }

        const data = await response.json();

        setRecipe({
          id: parseInt(id),
          title: data.title,
          ingredients: data.ingredients,
          instructions: Array.isArray(data.instructions)
            ? data.instructions
            : data.instructions.split('\n').filter(Boolean),
          notes: data.notes,
          author: data.author
        });
      } catch (err) {
        console.error('Error fetching shared recipe:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="outlined"
          size="small"
        >
          Home
        </Button>

        <Chip
          icon={<RestaurantIcon />}
          label="Shared Recipe"
          color="primary"
          variant="outlined"
          size="small"
        />
      </Box>

      {recipe && (
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
              {recipe.title}
            </Typography>

            {recipe.author && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Shared by <strong>{recipe.author}</strong>
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <List dense>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={`${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <List>
              {recipe.instructions.map((step, index) => (
                <ListItem key={index} disablePadding sx={{ py: 1, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      minWidth: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      mr: 2,
                      mt: 0.25,
                      flexShrink: 0
                    }}
                  >
                    {index + 1}
                  </Box>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>

            {recipe.notes && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Notes
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {recipe.notes}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px dashed',
          borderColor: 'divider',
          textAlign: 'center'
        }}
      >
        <RestaurantIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          Want to save and organize your own recipes?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Recipe Management Suite lets you store, organize, and share your entire collection.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/signup')}>
            Create Free Account
          </Button>
          <Button variant="outlined" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ViewRecipePage;
