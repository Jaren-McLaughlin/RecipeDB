import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography, Paper, Divider, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IngredientInput from './IngredientInput';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function RecipeForm({ recipe, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    description: recipe?.description || '',
    ingredients: recipe?.ingredients || [{ name: '', quantity: '', unit: '' }],
    instructions: recipe?.instructions || [''],
    notes: recipe?.notes || '',
  });
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [errors, setErrors] = useState({});
  const hasFetchedIngredients = useRef(false); //Prevent double fetch
  
  useEffect(() => {
    if (hasFetchedIngredients.current) return; //Skip if already fetched
    
    const fetchAvailableIngredients = async () => {
      hasFetchedIngredients.current = true; //Mark as fetched before async call
      try {
        const response = await fetch('/api/ingredients', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setAvailableIngredients(data);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    fetchAvailableIngredients();
  }, []); //Empty dependency array - only run once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleIngredientChange = (index, updatedIngredient) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = updatedIngredient;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }] });
  };

  const handleRemoveIngredient = (ingredientId) => {
    if (formData.ingredients.length === 1) return;
    const newIngredients = formData.ingredients.filter(ingredient => ingredient.id !== ingredientId);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddItem = (field) => {
    if (field === 'ingredients') { handleAddIngredient(); return; }
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleRemoveItem = (field, index) => {
    if (field === 'ingredients') { handleRemoveIngredient(index); return; }
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    const validIngredients = formData.ingredients.filter(ing => ing.name.trim() && ing.quantity.trim());
    if (validIngredients.length === 0) newErrors.ingredients = 'At least one complete ingredient is required';
    const validInstructions = formData.instructions.filter(instr => instr.trim() !== '');
    if (validInstructions.length === 0) newErrors.instructions = 'At least one instruction is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.name.trim() !== ''),
      instructions: formData.instructions.filter(instr => instr.trim() !== ''),
    };
    onSubmit(cleanedData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Recipe Title" name="title" value={formData.title} onChange={handleChange} error={Boolean(errors.title)} helperText={errors.title} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>Ingredients</Typography>
              {formData.ingredients.map((ingredient, index) => (
                <IngredientInput key={ingredient.id || index} ingredient={ingredient} onChange={(updatedIngredient) => handleIngredientChange(index, updatedIngredient)} onRemove={() => { if (!ingredient.id) { const newIngredients = [...formData.ingredients]; newIngredients.splice(index, 1); setFormData({...formData, ingredients: newIngredients}); } else { handleRemoveIngredient(ingredient.id) } }} availableIngredients={availableIngredients} />
              ))}
              <Button startIcon={<AddIcon />} onClick={handleAddIngredient} sx={{ mt: 1 }}>Add Ingredient</Button>
              {errors.ingredients && (<Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>{errors.ingredients}</Typography>)}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>Instructions</Typography>
              {formData.instructions.map((instruction, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                  <TextField fullWidth value={instruction} onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)} placeholder={`Step ${index + 1}`} multiline rows={2} variant="outlined" />
                  <IconButton color="error" onClick={() => handleRemoveItem('instructions', index)} disabled={formData.instructions.length <= 1} sx={{ ml: 1 }}><DeleteIcon /></IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={() => handleAddItem('instructions')} sx={{ mt: 1 }}>Add Step</Button>
              {errors.instructions && (<Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>{errors.instructions}</Typography>)}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Notes" name="notes" value={formData.notes} onChange={handleChange} multiline rows={3} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={onCancel}>Cancel</Button>
              <Button variant="contained" type="submit" color="primary">Save Recipe</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default RecipeForm;