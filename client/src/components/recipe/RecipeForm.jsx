import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IngredientInput from './IngredientInput';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function RecipeForm({ recipe, onSubmit, onCancel }) {
  // Initialize form state with recipe data or defaults
  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    description: recipe?.description || '',
    ingredients: recipe?.ingredients || [{ name: '', quantity: '', unit: '' }],
    instructions: recipe?.instructions || [''],
    notes: recipe?.notes || '',
  });
  
  // State for available ingredients (will be fetched from API)
  const [availableIngredients, setAvailableIngredients] = useState([]);
  
  // Track form validation errors
  const [errors, setErrors] = useState({});
  
  // Fetch available ingredients on component mount
  useEffect(() => {
    // This is mocked for simplicity
    setAvailableIngredients([
      { id: 1, name: 'Flour', measurement: 'cup' },
      { id: 2, name: 'Sugar', measurement: 'cup' },
      { id: 3, name: 'Butter', measurement: 'tbsp' },
      { id: 4, name: 'Eggs', measurement: 'unit' },
      { id: 5, name: 'Milk', measurement: 'cup' },
    ]);
  }, []);

  // Handle text field changes
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
  
  // Handle ingredient changes
  const handleIngredientChange = (index, updatedIngredient) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = updatedIngredient;
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };
  
  // Add a new ingredient input
  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }],
    });
  };
  
  // Remove an ingredient
  const handleRemoveIngredient = (index) => {
    if (formData.ingredients.length === 1) return; // Don't remove the last one
    
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };
  
  // Handle instruction changes 
  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };
  
  // Add instruction 
  const handleAddItem = (field) => {
    if (field === 'ingredients') {
      handleAddIngredient();
      return;
    }
    
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };
  
  // Remove instruction 
  const handleRemoveItem = (field, index) => {
    if (field === 'ingredients') {
      handleRemoveIngredient(index);
      return;
    }
    
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    const validIngredients = formData.ingredients.filter(
      ing => ing.name.trim() && ing.quantity.trim()
    );
    
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'At least one complete ingredient is required';
    }
    
    const validInstructions = formData.instructions.filter(
      instr => instr.trim() !== ''
    );
    
    if (validInstructions.length === 0) {
      newErrors.instructions = 'At least one instruction is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Filter out empty ingredients before submitting
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(
        ing => ing.name.trim() !== ''
      ),
      instructions: formData.instructions.filter(
        instr => instr.trim() !== ''
      ),
    };
    
    onSubmit(cleanedData);
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
          
          {/* Ingredients */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ingredients
              </Typography>
              
              {formData.ingredients.map((ingredient, index) => (
                <IngredientInput
                  key={index}
                  ingredient={ingredient}
                  onChange={(updatedIngredient) => 
                    handleIngredientChange(index, updatedIngredient)
                  }
                  onRemove={() => handleRemoveIngredient(index)}
                  availableIngredients={availableIngredients}
                />
              ))}
              
              <Button 
                startIcon={<AddIcon />}
                onClick={handleAddIngredient}
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
          
          {/* Instructions (keeping this from your original) */}
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
                    sx={{ ml: 1 }}
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