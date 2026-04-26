// src/components/dashboard/RecipeCard.jsx

/**
 * Displays a recipe as a card with title, notes, and action buttons.
 * @memberof Dashboard
 * @function RecipeCard
 * @param {Object} props
 * @param {Object} props.recipe - Recipe data object
 * @param {Function} props.onEdit - Called when edit is clicked
 * @param {Function} props.onDelete - Called when delete is clicked
 * @param {Function} props.onShare - Called when share is clicked
 * @returns {JSX.Element}
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';

const RecipeCard = ({ recipe, onEdit, onDelete, onShare }) => {
  const { id, title, notes } = recipe;
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/recipe/${id}`);

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/edit-recipe/${id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    if (onShare) onShare(id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          cursor: 'pointer'
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {notes}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ marginLeft: 'auto' }}>
          <Tooltip title="Share recipe">
            <IconButton aria-label="share" onClick={handleShareClick} color="error">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit recipe">
            <IconButton aria-label="edit" onClick={handleEditClick}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete recipe">
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;