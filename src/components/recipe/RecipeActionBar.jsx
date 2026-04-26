// src/components/recipe/RecipeActionBar.jsx

/**
 * Action bar for recipe pages with back, edit, delete, and share buttons.
 * @memberof Recipe
 * @function RecipeActionBar
 * @param {Object} props
 * @param {Function} props.onBack - Navigates back to the dashboard
 * @param {Function} props.onEdit - Opens the recipe editor
 * @param {Function} props.onDelete - Triggers the delete confirmation dialog
 * @param {Function} props.onShare - Copies the public share link to clipboard
 * @returns {JSX.Element}
 */

import React from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

function RecipeActionBar({ onBack, onEdit, onDelete, onShare }) {
  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      {onShare && (
        <Button
          startIcon={<ShareIcon />}
          variant="outlined"
          color="error"
          onClick={onShare}
          sx={{ mr: 1 }}
        >
          Share
        </Button>
      )}
      <Button
        startIcon={<EditIcon />}
        variant="outlined"
        color="error"
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