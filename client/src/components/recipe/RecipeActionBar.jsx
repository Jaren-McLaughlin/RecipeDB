// src/components/recipe/RecipeActionBar.jsx
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