// src/components/Dashboard/RecipeCard.jsx
import React from 'react';
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
    const { id, title, description} = recipe; // attributes of a recipe
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }
    }}>
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
      <IconButton aria-label="edit" onClick={() => onEdit(id)}>
        <Edit />
      </IconButton>
      <IconButton aria-label="delete" onClick={() => onDelete(id)}>
        <Delete />
      </IconButton>
    </Box>
  </CardActions>
    </Card>
  );
}

export default RecipeCard;