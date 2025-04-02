import React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';

const UsernameField = ({ 
  value,
  onChange,
  error,
  helperText,
  autoFocus = false
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor="userName">Username</FormLabel>
      <TextField
        error={error}
        helperText={helperText}
        id="userName"
        name="userName"
        value={value}
        onChange={onChange}
        placeholder="Your username"
        autoComplete="username"
        autoFocus={autoFocus}
        required
        fullWidth
        variant="outlined"
        color={error ? 'error' : 'primary'}
      />
    </FormControl>
  );
};

export default UsernameField;