import React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';

const EmailField = ({ 
  value,
  onChange,
  error,
  helperText,
  autoFocus = false
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor="email">Email</FormLabel>
      <TextField
        error={error}
        helperText={helperText}
        id="email"
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        placeholder="your@email.com"
        autoComplete="email"
        autoFocus={autoFocus}
        required
        fullWidth
        variant="outlined"
        color={error ? 'error' : 'primary'}
      />
    </FormControl>
  );
};

export default EmailField;