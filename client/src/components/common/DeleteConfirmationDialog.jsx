// src/components/recipe/DeleteConfirmationDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

function DeleteConfirmationDialog({ open, title, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{title}"? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;