import React from 'react';
import { Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthFooter = ({ 
  message, 
  linkText, 
  linkPath 
}) => {
  const navigate = useNavigate();
  
  return (
    <Typography sx={{ textAlign: 'center' }}>
      {message}{' '}
      <Link
        component="button"
        variant="body2"
        onClick={() => navigate(linkPath)}
      >
        {linkText}
      </Link>
    </Typography>
  );
};

export default AuthFooter;