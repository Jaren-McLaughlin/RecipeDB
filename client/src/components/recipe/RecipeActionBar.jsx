

/**
 * Action bar for recipe pages with back, edit, and delete buttons.
 * @memberof Recipe
 * @function RecipeActionBar
 * @param {Object} props - Component properties
 * @param {Function} props.onBack - Function called when back button is clicked
 * @param {Function} props.onEdit - Function called when edit button is clicked
 * @param {Function} props.onDelete - Function called when delete button is clicked
 * @returns {JSX.Element} Action bar component
 * @example
 * <RecipeActionBar
 *   onBack={() => navigate('/')}
 *   onEdit={() => handleEdit(recipeId)}
 *   onDelete={() => setDeleteDialogOpen(true)}
 * />
 */

import React from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function RecipeActionBar({ onBack, onEdit, onDelete }) {
  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={onBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button 
        startIcon={<EditIcon />} 
        variant="outlined" 
        onClick={onEdit}
        sx={{ mr: 1 }}
      >
        Edit
      </Button>
      <Button 
        startIcon={<DeleteIcon />} 
        variant="outlined" 
        color="error" 
        onClick={onDelete}
      >
        Delete
      </Button>
    </Box>
  );
}

export default RecipeActionBar;