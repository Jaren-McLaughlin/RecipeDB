import React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';

const PasswordField = ({ 
  id = 'password',
  label = 'Password',
  placeholder = '••••••••',
  autoComplete = 'current-password',
  value,
  onChange,
  error,
  helperText
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextField
        error={error}
        helperText={helperText}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="password"
        id={id}
        autoComplete={autoComplete}
        required
        fullWidth
        variant="outlined"
        color={error ? 'error' : 'primary'}
      />
    </FormControl>
  );
};

export default PasswordField;