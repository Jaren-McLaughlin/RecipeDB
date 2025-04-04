import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Autocomplete, 
  IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IngredientInput = ({ 
  ingredient, 
  onChange, 
  onRemove, 
  availableIngredients = [] 
}) => {
  // Local state to track input values
  const [inputValues, setInputValues] = useState({
    name: ingredient.name || '',
    quantity: ingredient.quantity || '',
    unit: ingredient.unit || ''
  });

  // Update parent component when values change
  useEffect(() => {
    onChange({
      ...ingredient,
      name: inputValues.name,
      quantity: inputValues.quantity,
      unit: inputValues.unit
    });
  }, [inputValues]);

  // Handle input changes
  const handleChange = (field, value) => {
    setInputValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      {/* Quantity input */}
      <TextField
        size="small"
        label="Amount"
        value={inputValues.quantity}
        onChange={(e) => handleChange('quantity', e.target.value)}
        sx={{ width: '20%', mr: 1 }}
        type="number"
        inputProps={{ min: 0, step: 0.01 }}
      />
      
      {/* Unit input */}
      <TextField
        size="small"
        label="Unit"
        value={inputValues.unit}
        onChange={(e) => handleChange('unit', e.target.value)}
        sx={{ width: '20%', mr: 1 }}
        placeholder="cups, tbsp, g"
      />
      
      {/* Ingredient name with autocomplete */}
      <Autocomplete
        freeSolo
        size="small"
        options={availableIngredients.map(ing => ing.name)}
        value={inputValues.name}
        onChange={(_, newValue) => handleChange('name', newValue)}
        onInputChange={(_, newValue) => handleChange('name', newValue)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Ingredient" 
            placeholder="Start typing..."
          />
        )}
        sx={{ flexGrow: 1 }}
      />
      
      <IconButton 
        color="error" 
        onClick={onRemove} 
        sx={{ ml: 1 }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default IngredientInput;