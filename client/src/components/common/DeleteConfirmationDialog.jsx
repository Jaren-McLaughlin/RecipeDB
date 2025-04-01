
/**
 * Dialog for confirming deletion actions.
 * @memberof Common
 * @function DeleteConfirmationDialog
 * @param {Object} props - Component properties
 * @param {boolean} props.open - Whether the dialog is open
 * @param {string} props.title - Title to display in the dialog
 * @param {Function} props.onClose - Function called when dialog is closed
 * @param {Function} props.onConfirm - Function called when delete is confirmed
 * @returns {JSX.Element} Confirmation dialog component
 * @example
 * const [dialogOpen, setDialogOpen] = useState(false);
 * 
 * <DeleteConfirmationDialog
 *   open={dialogOpen}
 *   title="Recipe Title"
 *   onClose={() => setDialogOpen(false)}
 *   onConfirm={() => handleDelete(recipeId)}
 * />
 */


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