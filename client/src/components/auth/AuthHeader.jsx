import React from 'react';
import { Typography, Box } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const AuthHeader = ({ title }) => {
  return (
    <>
      <RestaurantIcon color="primary" sx={{ fontSize: 40 }} />
      <Typography component="h1" variant="h4">
        {title}
      </Typography>
    </>
  );
};

export default AuthHeader;