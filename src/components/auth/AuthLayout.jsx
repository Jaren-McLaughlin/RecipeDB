import React from 'react';
import { Container, Paper, Box } from '@mui/material';

const AuthLayout = ({ children }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default AuthLayout;