import React from 'react';
import { Button } from '@mui/material';

const AuthSubmitButton = ({ 
  label, 
  isSubmitting = false,
  disabled = false
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="large"
      disabled={isSubmitting || disabled}
      sx={{ mt: 2 }}
    >
      {isSubmitting ? 'Processing...' : label}
    </Button>
  );
};

export default AuthSubmitButton;