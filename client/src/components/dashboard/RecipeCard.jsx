
/**
 * Displays a recipe as a card with title, notes, and action buttons.
 * @memberof Dashboard
 * @function RecipeCard
 * @param {Object} props - Component properties
 * @param {Object} props.recipe - Recipe data object
 * @param {number} props.recipe.id - Recipe ID
 * @param {string} props.recipe.title - Recipe title
 * @param {string} props.recipe.notes - Brief recipe description
 * @param {Function} props.onEdit - Function called when edit button is clicked
 * @param {Function} props.onDelete - Function called when delete button is clicked
 * @returns {JSX.Element} A card component for displaying recipe information
 * @example
 * const recipe = {
 *   id: 1,
 *   title: "Spaghetti Bolognese",
 *   notes: "Classic Italian pasta dish"
 * };
 * 
 * <RecipeCard 
 *   recipe={recipe}
 *   onEdit={(id) => console.log('Edit recipe', id)}
 *   onDelete={(id) => console.log('Delete recipe', id)}
 * />
 */


import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card, //Card: a surface-level container for grouping related components.
    CardActions, //Card Actions: an optional wrapper that groups a set of buttons.
    CardContent, //Card Content: the wrapper for the Card content.
    Typography, //For text with consistent styling
    IconButton, //Button component optimized for icon display
    Box //A general-purpose layout component (like a div with styling)
} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';

const RecipeCard = ({ recipe, onEdit, onDelete}) => { // These are the functions that will be associated with this object
    const { id, title, notes} = recipe; // attributes of a recipe
    const navigate = useNavigate();

  // Function to handle card click
  const handleCardClick = () => {
    navigate(`/recipe/${id}`); // Navigate to the recipe page
  };
  
  // Stop propagation to prevent navigation when clicking edit or delete buttons
  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/edit-recipe/${id}`);
  };
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };


  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        cursor: 'pointer'
      }
    }}onClick={handleCardClick} >
    <CardContent sx={{ flexGrow: 1 }}>
    <Typography gutterBottom variant="h5" component="div">
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography> 
  </CardContent>
  <CardActions disableSpacing>
    <Box sx={{ marginLeft: 'auto' }}>
      <IconButton aria-label="edit" onClick={handleEditClick}>
        <Edit />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDeleteClick}>
        <Delete />
      </IconButton>
    </Box>
  </CardActions>
    </Card>
  );
}

export default RecipeCard;