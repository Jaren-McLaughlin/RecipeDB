

/**
 * Form for creating or editing recipes.
 * @memberof Recipe
 * @function RecipeForm
 * @param {Object} props - Component properties
 * @param {Object} props.recipe - Recipe data object with initial values
 * @param {Function} props.onSubmit - Function called when form is submitted
 * @param {Function} props.onCancel - Function called when cancel button is clicked
 * @returns {JSX.Element} Recipe form component
 * @example
 * const recipe = createBlankRecipe();
 * 
 * <RecipeForm
 *   recipe={recipe}
 *   onSubmit={(formData) => handleSubmit(formData)}
 *   onCancel={() => navigate('/')}
 * />
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Divider,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { validateRecipe } from '../../models/Recipe';

function RecipeForm({ recipe, onSubmit, onCancel }) {
  // Initialize form state with recipe data or defaults
  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    ingredients: recipe?.ingredients || [''],
    instructions: recipe?.instructions || [''],
    notes: recipe?.notes || '',
  });
  
  // Track form validation errors
  const [errors, setErrors] = useState({});
  
  // Handle changes to text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  // Handle changes to array fields (ingredients & instructions)
  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };
  
  // Add a new empty item to an array field
  const handleAddItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };
  
  // Remove an item from an array field
  const handleRemoveItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the recipe
    const { isValid, errors: validationErrors } = validateRecipe({
      ...formData,
      // Filter out empty strings
      ingredients: formData.ingredients.filter(item => item.trim() !== ''),
      instructions: formData.instructions.filter(item => item.trim() !== ''),
    });
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    
    // Call the onSubmit callback with the form data
    onSubmit(formData);
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Recipe Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              variant="outlined"
            />
          </Grid>
          
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={2}
              variant="outlined"
            />
          </Grid>
          
          {/* Ingredients */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ingredients
              </Typography>
              
              {formData.ingredients.map((ingredient, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                  <TextField
                    fullWidth
                    value={ingredient}
                    onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    variant="outlined"
                    size="small"
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveItem('ingredients', index)}
                    disabled={formData.ingredients.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              
              <Button 
                startIcon={<AddIcon />} 
                onClick={() => handleAddItem('ingredients')}
                sx={{ mt: 1 }}
              >
                Add Ingredient
              </Button>
              
              {errors.ingredients && (
                <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                  {errors.ingredients}
                </Typography>
              )}
            </Box>
          </Grid>
          
          {/* Instructions */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              
              {formData.instructions.map((instruction, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                  <TextField
                    fullWidth
                    value={instruction}
                    onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveItem('instructions', index)}
                    disabled={formData.instructions.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              
              <Button 
                startIcon={<AddIcon />} 
                onClick={() => handleAddItem('instructions')}
                sx={{ mt: 1 }}
              >
                Add Step
              </Button>
              
              {errors.instructions && (
                <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                  {errors.instructions}
                </Typography>
              )}
            </Box>
          </Grid>
          
          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          
          {/* Form Actions */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                type="submit"
                color="primary"
              >
                Save Recipe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default RecipeForm;